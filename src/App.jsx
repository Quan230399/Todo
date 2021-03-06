import React, {useEffect, useState} from "react";
import slugsString from "slug";
import Snackbar from "@material-ui/core/Snackbar";
import Control from "./components/Control";
import Header from "./components/Header";
import TaskFrom from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import Alert from "./components/Alert";

const randomstring = require("randomstring");

function App() {
  const [toggle, settoggle] = useState(false);
  const [taskList, settaskList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [taskItem, settaskItem] = useState();
  const [itemUpdate, setitemUpdate] = useState();
  const [Key, setKey] = useState("");
  const [keySort, setkeySort] = useState("");
  const [open, setopen] = useState(false);
  const [nameTitle, setnameTitle] = useState("");
  const [statusAlert, setstatusAlert] = useState("");

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

  const openAlert = () => {
    setopen(true);
    setTimeout(() => {
      setopen(false);
    }, 2000);
  };

  const tasksListSlugs = taskList.map((task) => slugsString(task.name.trim()));

  const onSubmit = (data) => {
    const tasks = taskList;
    if (data.id === "") {
      if (data.name !== "") {
        if (!tasksListSlugs.includes(slugsString(data.name.trim()))) {
          const myData = {
            ...data,
            id: randomstring.generate(7),
            nameSlugs: slugsString(data.name.trim()),
          };
          tasks.push(myData);
          settaskList(tasks);
          settaskItem(myData);
          setkeySort("");
          openAlert();
          setnameTitle("Th??m th??nh c??ng");
          setstatusAlert("success");

          localStorage.setItem("tasks", JSON.stringify(taskList));
        } else {
          setnameTitle("C??ng vi???c ???? t???n t???i");
          setstatusAlert("warning");
          openAlert();
        }
      } else {
        setnameTitle("B???n ch??a nh???p t??n");
        setstatusAlert("warning");
        openAlert();
      }
    } else {
      const index = findIn(data.id);
      const myUpdate = {
        ...data,
        nameSlugs: slugsString(data.name),
      };
      tasks[index] = myUpdate;
      settaskList(tasks);
      setnameTitle("Ch???nh s???a th??nh c??ng");
      setstatusAlert("success");
      openAlert();
      localStorage.setItem("tasks", JSON.stringify(taskList));
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
    const check = window.confirm("B???n mu???n c?? ch???c mu???n x??a");
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
    setKey(slugsString(key));
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
      <Snackbar open={open}>
        <Alert name={nameTitle} status={statusAlert} />
      </Snackbar>
    </div>
  );
}
export default App;
