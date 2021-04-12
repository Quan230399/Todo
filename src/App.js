import React, { useEffect, useState } from 'react';
import Control from './components/Control';
import Header from './components/Header';
import TaskFrom from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

var randomstring = require('randomstring');

function App() {
  const [toggle, settoggle] = useState(false);
  const [taskList, settaskList] = useState([]);
  const [taskItem, settaskItem] = useState();
  const [itemUpdate, setitemUpdate] = useState();
  const [Key, setKey] = useState('');
  const [keySort, setkeySort] = useState('');

  const findIndex = (id) => {
    let tasks = taskList;
    let result = -1;
    tasks.forEach((task, index) => {
      if (id === task.id) return (result = index);
    });
    return result;
  };

  // useEffect(() => {}, [taskItem]);
  // useEffect(() => {}, [toggle]);

  useEffect(() => {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
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

  const onSubmit = (data) => {
    let task = taskList;
    if (data.id === '') {
      data.id = randomstring.generate(7);
      task.push(data);
      settaskList(task);
      settaskItem(data);

      localStorage.setItem('tasks', JSON.stringify(taskList));
    } else {
      let index = findIndex(data.id);
      let tasks = taskList;
      tasks[index] = data;
      settaskList(tasks);
      localStorage.setItem('tasks', JSON.stringify(taskList));
    }
    onCancel();
  };

  const onToggleStatus = (task) => {
    let index = findIndex(task.id);
    let tasks = taskList;
    tasks[index].status = !task.status;
    settaskList(tasks);
    localStorage.setItem('tasks', JSON.stringify(taskList));
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
    localStorage.setItem('tasks', JSON.stringify(taskList));
  };

  const onUpdate = (task) => {
    let taskItem = task;
    setitemUpdate(taskItem);
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
          ''
        )}

        <div className={toggle ? 'task-list-66' : 'task-list-100'}>
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
