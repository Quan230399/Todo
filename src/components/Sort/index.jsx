import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

Sort.propTypes = {
  onSort: PropTypes.func,
};

Sort.defaultProps = {
  onSort: null,
};

function Sort(props) {
  const { onSort } = props;

  const onSortKey = (e) => {
    //  console.log(e.target.name);
    onSort(e.target.name);
  };

  return (
    <div className="sort">
      <div className="sort-form">
        <div className="dropdown">
          <a className="dropbtn">Sắp xếp</a>
          <div className="dropdown-content">
            <a href="#" name="ẩn" onClick={onSortKey}>
              Ẩn
            </a>
            <a href="#" name="kích hoạt" onClick={onSortKey}>
              Kích hoạt
            </a>
            <hr></hr>
            <a href="#" name="az" onClick={onSortKey}>
              A-Z
            </a>
            <a href="#" name="za" onClick={onSortKey}>
              Z-A
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sort;
