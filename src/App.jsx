import React, {useEffect, useState} from "react";
import Control from "./components/Control";
import Header from "./components/Header";
import TaskFrom from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const randomstring = require("randomstring");

function App() {
  const [toggle, settoggle] = useState(false);
  const [taskList, settaskList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [taskItem, settaskItem] = useState();
  const [itemUpdate, setitemUpdate] = useState();
  const [Key, setKey] = useState("");
  const [keySort, setkeySort] = useState("");

  const findIn = (id) => {
    // console.log(id);
    const tasks = taskList.map((task) => task.id);
    return tasks.indexOf(id);
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
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

  const slugs = (name) => {
    let slug = name.toLowerCase();

    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    slug = slug.replace(
      /\\`|\\~|\\!|\\@|\\#|\||\$|\\%|\^|\\&|\*|\(|\)|\+|\\=|\\,|\.|\/|\?|\\>|\\<|\\'|\\"|\\:|\\;|_/gi,
      ""
    );
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\\-\\-\\-\\-\\-/gi, "-");
    slug = slug.replace(/\\-\\-\\-\\-/gi, "-");
    slug = slug.replace(/\\-\\-\\-/gi, "-");
    slug = slug.replace(/\\-\\-/gi, "-");
    // slug = '@' + slug + '@';
    slug = slug.replace(/\\@\\-|\\-\\@|\\@/gi, "");

    return slug;
  };

  const tasksListSlugs = taskList.map((task) => slugs(task.name));
  console.log(tasksListSlugs);

  const onSubmit = (data) => {
    const tasks = taskList;
    if (data.id === "") {
      if (data.name !== "") {
        if (!tasksListSlugs.includes(slugs(data.name))) {
          const myData = {...data, id: randomstring.generate(7)};
          tasks.push(myData);
          settaskList(tasks);
          settaskItem(myData);
          localStorage.setItem("tasks", JSON.stringify(taskList));
          alert("Thêm thành công !");
        } else {
          alert("Tên công việc đã tồn tại");
        }
      } else {
        alert("Bạn chưa nhập tên");
      }
    } else {
      const index = findIn(data.id);
      tasks[index] = data;
      settaskList(tasks);
      localStorage.setItem("tasks", JSON.stringify(taskList));
      alert("Chỉnh sửa thành công !");
    }
    onCancel();
  };

  const onToggleStatus = (task) => {
    const index = findIn(task.id);
    const tasks = taskList;
    tasks[index].status = !task.status;
    settaskList(tasks);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };

  const onDelete = (task) => {
    const check = window.confirm("Bạn muốn có chắc muốn xóa");
    if (check) {
      const index = findIn(task.id);
      const tasks = taskList;
      if (index !== -1) {
        tasks.splice(index, 1);
      }
      settaskList(tasks);
      settaskItem(task);
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  };

  const onUpdate = (task) => {
    const taskItemUp = task;
    setitemUpdate(taskItemUp);
    settoggle(true);
  };

  const onSearch = (key) => {
    setKey(key);
  };

  const onSort = (key) => {
    setkeySort(key);
  };

  return (
    <div className="main">
      <div className="header-title">
        <Header />
      </div>
      <div className="task">
        {toggle ? (
          <div className="task-form">
            <TaskFrom onSubmit={onSubmit} onCancelForm={onCancel} Update={itemUpdate} />
          </div>
        ) : (
          ""
        )}

        <div className={toggle ? "task-list-66" : "task-list-100"}>
          <Control onToggleForm={onToggle} onSearch={onSearch} onSort={onSort} />
          <TaskList
            taskList={taskList}
            onDeleteTask={onDelete}
            onUpdateTask={onUpdate}
            onToggle={onToggleStatus}
            keySearch={Key}
            keySort={keySort}
          />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
export default App;
