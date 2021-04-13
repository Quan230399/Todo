import React, {  useState } from "react";
import PropTypes from "prop-types";
import './index.css';

ItemList.propTypes = {
  task: PropTypes.object.isRequired,
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

function ItemList(props) {
  const { task, index, onDeleteItem, onUpdateItem, onToggleStatus } = props;
  const [statusItem, setstatusItem] = useState();

  // useEffect(() => {}, [statusItem]);

  const onDelete = (task) => {
    // console.log(task.id);
    if (!onDeleteItem) return;
    let conf = window.confirm('Bạn có chắc muốn xóa không');
    if (conf == true) {
      onDeleteItem(task);
    } else {
    }
    
  };

  const onUpdate = (task) => {
    if (!onUpdateItem) return;
    onUpdateItem(task);
  };

  const onToggle = (task) => {
    if (!onToggleStatus) return;
    onToggleStatus(task);
    setstatusItem(!task.status);
  };

  const status = (task) => {
    return (
      <span>
        {task.status === true || task.status === "true" ? <span className='success'>Kích hoạt</span> : <span className='waring'>Ẩn</span>}
      </span>
    );
  };

  return (
    <tr>
      <td style={{ width: "10%" }}>{index + 1}</td>
      <td style={{ width: "40%" }}>{task.name}</td>
      <td style={{ width: "20%" }} onClick={() => onToggle(task)}>
        {status(task)}
      </td>
      <td style={{ width: "30%" }}>
        <a type="submit" className="btn btn-warning" onClick={() => onUpdate(task)}>
          Sửa
        </a>
        <a type="button" className="btn btn-danger" onClick={() => onDelete(task)}>
          Xóa
        </a>
      </td>
    </tr>
  );
}

export default ItemList;
