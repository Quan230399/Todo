import React from "react";
import PropTypes from "prop-types";
import Search from "../Search";
import Sort from "../Sort";
import "./index.css";
import AddTask from "../AddTask";

Control.propTypes = {
  onToggleForm: PropTypes.func,
  onSearch: PropTypes.func,
  onSort: PropTypes.func,
};

Control.defaultProps = {
  onToggleFrom: null,
  onSearch: null,
  onSort: null,
};

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
        <AddTask onToggle={onToggle}></AddTask>
      </div>
      <div className="search-sort">
        <Search onSearch={onSearch}></Search>
        <Sort onSort={onSortKey}></Sort>
      </div>
    </div>
  );
}

export default Control;
