import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

TaskFrom.propTypes = {
  onCancelForm: PropTypes.func,
  onSubmit: PropTypes.func,
  onToggleForm: PropTypes.func,
  Update: PropTypes.object.isRequired,
};

TaskFrom.defaultProps = {
  onCancelForm: null,
  onSubmit: null,
  onToggleForm: null,
};

function TaskFrom(props) {
  const [valueForm, setvalueForm] = useState({
    id: "",
    name: "",
    status: true,
  });

  const { onCancelForm, onSubmit, Update } = props;
  

  useEffect(() => {
    if (Update && Update.id) {
      // let statusI = Update.status
      setvalueForm({
        id: Update.id,
        name: Update.name,
        status: Update.status  
      });
    }
  }, [Update])

  const handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value=='false'?false:target.value;
    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };

  const onCancel = () => {
    if (!onCancelForm) return;
    onCancelForm();
    setvalueForm({
      id: "",
      name: "",
      status: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(valueForm);
    onSubmit(valueForm);
    setvalueForm({
      id: "",
      name: "",
      status: true,
    });
  };

  return (
    <div>
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Thêm Công Việc
            <a onClick={onCancel}>
              <span className="fa fa-times-circle text-right">x</span>
            </a>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                style={{ height: "30px" }}
                type="text"
                className="form-control"
                name="name"
                value={valueForm.name}
                onChange={handleChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              value={valueForm.status}
              onChange={handleChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
             
            </select>
            <br></br>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className="fa fa-plus mr-5"></span>Lưu Lại
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onCancel}
              >
                <span className="fa fa-close mr-5"></span>Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskFrom;
