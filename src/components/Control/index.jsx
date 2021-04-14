import React from "react";
import PropTypes from "prop-types";
import Search from "../Search";
import Sort from "../Sort";
import "./index.css";
import AddTask from "../AddTask";

function Control(props) {
  const { onToggleForm, onSearch, onSort } = props;

  const onToggle = () => {
    if (!onToggleForm) return;
    onToggleForm();
  };

  const onSortKey = (key) => {
    onSort(key);
  };

  return (
    <div className="control_form">
      <div className="add">
        <AddTask onToggle={onToggle} />
      </div>
      <div className="search-sort">
        <Search onSearch={onSearch} />
        <Sort onSort={onSortKey} />
      </div>
    </div>
  );
}

Control.propTypes = {
  onToggleForm: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  onSort: PropTypes.func,
};

Control.defaultProps = {
  onSearch: null,
  onSort: null,
};

export default Control;
