import React, { useEffect, useState } from "react";
import Control from "./components/Control";
import Header from "./components/Header";
import TaskFrom from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

var randomstring = require("randomstring");

function App() {
  const [toggle, settoggle] = useState(false);
  const [taskList, settaskList] = useState([]);
  const [taskItem, settaskItem] = useState();
  const [itemUpdate, setitemUpdate] = useState({});
  const [Key, setKey] = useState("");
  const [keySort, setkeySort] = useState("");

  const findIndex = (id) => {
    let tasks = taskList;
    let result = -1;
    tasks.forEach((task, index) => {
      if (id === task.id) return (result = index);
    });
    return result;
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      settaskList(tasks);
    }
  }, []);

  const onToggle = () => {
    settoggle(!toggle);
    setitemUpdate();
  };

  const onCancel = () => {
    settoggle(false);
    setitemUpdate();
  };

  const Slugs = (name) => {
    let slug = name.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    //Xóa các ký tự đặt biệt
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    );
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");

    return slug;
  };

  const tasksListSlugs = taskList.map((task, index) => {
    return Slugs(task.name);
  });

  const onSubmit = (data) => {
    let task = taskList;
    if (data.id === "") {
      // console.log(data.name);
      if (!data.name == "") {
        if (tasksListSlugs.indexOf(Slugs(data.name))===-1) {
          data.id = randomstring.generate(7);
          task.push(data);
          settaskList(task);
          settaskItem(data);
          alert("Thêm thành công");
          localStorage.setItem("tasks", JSON.stringify(taskList));
          onCancel();
        } else {
          alert("Tên công việc đã tồn tại");
        }
      } else {
        alert("Bạn chưa nhập tên công việc");
      }
    } else {
      let index = findIndex(data.id);
      let tasks = taskList;
      tasks[index] = data;
      settaskList(tasks);
      localStorage.setItem("tasks", JSON.stringify(taskList));
      alert("Chỉnh sửa thành công");
      onCancel();
    }
  };

  // console.log(tasksListSlugs);

  const onToggleStatus = (task) => {
    let index = findIndex(task.id);
    let tasks = taskList;
    tasks[index].status = !task.status;
    settaskList(tasks);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };

  const onDelete = (task) => {
    // console.log(findIndex(task.id));
    let index = findIndex(task.id);
    let tasks = taskList;
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    settaskList(tasks);
    settaskItem(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };

  const onUpdate = (task) => {
    let taskItem = task;
    setitemUpdate(taskItem);
    settoggle(true);
  };

  const onSearch = (key) => {
    setKey(key);
    console.log(key);
  };

  const onSort = (key) => {
    setkeySort(key);
  };

  return (
    <div className="main">
      <div className="header-title">
        <Header></Header>
      </div>
      <div className="task">
        {toggle ? (
          <div className="task-form">
            <TaskFrom
              onSubmit={onSubmit}
              onCancelForm={onCancel}
              Update={itemUpdate}
            ></TaskFrom>
          </div>
        ) : (
          ""
        )}

        <div className={toggle ? "task-list-66" : "task-list-100"}>
          <Control
            onToggleForm={onToggle}
            onSearch={onSearch}
            onSort={onSort}
          ></Control>
          <TaskList
            taskList={taskList}
            onDeleteTask={onDelete}
            onUpdateTask={onUpdate}
            onToggle={onToggleStatus}
            keySearch={Key}
            keySort={keySort}
          ></TaskList>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}
export default App;
