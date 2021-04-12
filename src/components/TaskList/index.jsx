import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import ItemList from "../ListItem";

TaskList.propTypes = {
  taskList: PropTypes.array.isRequired,
  onDeleteTask: PropTypes.func,
  onUpdateTask: PropTypes.func,
  onToggle: PropTypes.func,
  keySearch: PropTypes.string.isRequired,
  keySort: PropTypes.string.isRequired,
};

TaskList.defaultProps = {
  onDeleteTask: null,
  onUpdateTask: null,
  onToggle: null,
};

function TaskList(props) {
  const { taskList, onDeleteTask, onUpdateTask, onToggle, keySearch, keySort } = props;

  console.log(keySort);

  const onDelete = (task) => {
    if (!onDeleteTask) return;
    onDeleteTask(task);
  };

  const onUpdate = (task) => {
    if (!onUpdateTask) return;
    onUpdateTask(task);
  };

  const onToggleStatus = (task) => {
    if (!onToggle) return;
    onToggle(task);
  };

  let tasks = taskList.filter((task)=>{
       return task.name.toLowerCase().includes(keySearch);
  });

  let element = tasks.map((task, index) => {
    return (
      <ItemList
        task={task}
        index={index}
        key={task.id}
        onDeleteItem={onDelete}
        onUpdateItem={onUpdate}
        onToggleStatus={onToggleStatus}
      ></ItemList>
    );
  });


  return (
    <div className="container">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center" style={{ width: "10%" }}>
              STT
            </th>
            <th className="text-center" style={{ width: "40%" }}>
              Tên
            </th>
            <th className="text-center" style={{ width: "20%" }}>
              Trạng Thái
            </th>
            <th className="text-center" style={{ width: "30%" }}>
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody>{element}</tbody>
      </table>
    </div>
  );
}

export default TaskList;
