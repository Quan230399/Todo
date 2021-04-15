import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import ItemList from "../ListItem";

function TaskList(props) {
  const {taskList, onDeleteTask, onUpdateTask, onToggle, keySearch, keySort} = props;

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


  const taskSort = taskList.sort((x, y) => {
    if (keySort === "ẩn") return x.status - y.status;
    if (keySort === "kích hoạt") return y.status - x.status;
    if (keySort === "ab") return x.name.localeCompare(y.name);
    if (keySort === "ba") return y.name.localeCompare(x.name);
    return 0;
  });

  const tasks = taskSort.filter((task) => task.nameSlugs.includes(keySearch));

  const element = tasks.map((task, index) => (
    <ItemList
      task={task}
      index={index}
      key={task.id}
      onDeleteItem={onDelete}
      onUpdateItem={onUpdate}
      onToggleStatus={onToggleStatus}
    />
  ));

  return (
    <div className="container">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center" style={{width: "10%"}}>
              STT
            </th>
            <th className="text-center" style={{width: "40%"}}>
              Tên
            </th>
            <th className="text-center" style={{width: "20%"}}>
              Trạng Thái
            </th>
            <th className="text-center" style={{width: "30%"}}>
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody>{element}</tbody>
      </table>
    </div>
  );
}

TaskList.propTypes = {
  taskList: PropTypes.instanceOf(Array).isRequired,
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

export default TaskList;
