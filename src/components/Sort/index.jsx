import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function Sort(props) {

  const { onSort }=props;

  const onSortKey=(e)=>{
      onSort(e.target.name);

  }

  return (
    <div className="sort">
      <div className="sort-form">
        <div className="dropdown">
          <a href="/#" className="dropbtn">Sắp xếp</a>
          <div className="dropdown-content">
            <a href="/#"  name='ẩn' onClick={onSortKey}>Ẩn</a>
            <a href="/#"  name='kích hoạt' onClick={onSortKey}>Kích hoạt</a>
            <hr />
            <a href="/#" name='ab' onClick={onSortKey}>A-Z</a>
            <a href="/#" name='ba' onClick={onSortKey}>Z-A</a>
          </div>
        </div>
      </div>
    </div>
  );
}

Sort.propTypes = {
  onSort: PropTypes.func,
};

Sort.defaultProps={
  onSort: null,
};


export default Sort;
