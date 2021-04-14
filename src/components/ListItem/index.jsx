import React, {  useState } from "react";
import PropTypes from "prop-types";

function ItemList(props) {
  const { task, index, onDeleteItem, onUpdateItem, onToggleStatus } = props;
  // eslint-disable-next-line no-unused-vars
  const [, setstatusItem] = useState();

  // useEffect(() => {}, [statusItem]);

  const onDelete = (myTask) => {
    // console.log(task.id);
    if (!onDeleteItem) return;
    onDeleteItem(myTask);
  };

  const onUpdate = (myTask) => {
    if (!onUpdateItem) return;
    onUpdateItem(myTask);
  };

  const onToggle = (myTask) => {
    if (!onToggleStatus) return;
    onToggleStatus(myTask);
    setstatusItem(!task.status);
  };

  const status = (myTask) => (
      <span>
        {myTask.status === true || myTask.status === "true" ? "Kích hoạt" : "Ẩn"}
      </span>
    );

  return (
    <tr>
      <td style={{ width: "10%" }}>{index + 1}</td>
      <td style={{ width: "40%" }}>{task.name}</td>
      <td style={{ width: "20%" }} onClick={() => onToggle(task)} aria-hidden="true">
        {status(task)}
      </td>
      <td style={{ width: "30%" }}>
        <button  type="submit" className="btn btn-warning" onClick={() => onUpdate(task)}>
          Sửa
        </button>
        <button  type="button" className="btn btn-danger" onClick={() => onDelete(task)}>
          Xóa
        </button>
      </td>
    </tr>
  );
}


ItemList.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  onDeleteItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  onToggleStatus: PropTypes.func,
};

ItemList.defaultProps = {
  onDeleteItem: null,
  onUpdateItem: null,
  onToggleStatus: null,
};

export default ItemList;
