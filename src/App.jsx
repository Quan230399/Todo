import React, { useEffect, useState } from 'react';
import Control from './components/Control';
import Header from './components/Header';
import TaskFrom from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const randomstring = require('randomstring');

function App() {
  const [toggle, settoggle] = useState(false);
  const [taskList, settaskList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [taskItem, settaskItem] = useState();
  const [itemUpdate, setitemUpdate] = useState();
  const [Key, setKey] = useState('');
  const [keySort, setkeySort] = useState('');

  const findIn = (id) => {
    // console.log(id);
    const tasks = taskList.map((task)=>task.id);
    return tasks.indexOf(id);
  };


  useEffect(() => {
    if (localStorage && localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
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
    const tasks = taskList;
    if (data.id === '') {
      const myData = {...data, id: randomstring.generate(7)}
      tasks.push(myData);
      settaskList(tasks);
      settaskItem(myData);

      localStorage.setItem('tasks', JSON.stringify(taskList));
    } else {
      const index = findIn(data.id);
      tasks[index] = data;
      settaskList(tasks);
      localStorage.setItem('tasks', JSON.stringify(taskList));
    }
    onCancel();
  };

  const onToggleStatus = (task) => {
    const index = findIn(task.id);
    const tasks = taskList;
    tasks[index].status = !task.status;
    settaskList(tasks);
    localStorage.setItem('tasks', JSON.stringify(taskList));
  };

  const onDelete = (task) => {
    const index = findIn(task.id);
    console.log(index);
    const tasks = taskList;
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    settaskList(tasks);
    settaskItem(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
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
            <TaskFrom
              onSubmit={onSubmit}
              onCancelForm={onCancel}
              Update={itemUpdate}
             />
          </div>
        ) : (
          ''
        )}

        <div className={toggle ? 'task-list-66' : 'task-list-100'}>
          <Control
            onToggleForm={onToggle}
            onSearch={onSearch}
            onSort={onSort}
           />
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
