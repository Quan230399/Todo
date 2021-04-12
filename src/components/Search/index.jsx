
import React from "react";
import PropTypes from "prop-types";
import "./index.css";

Search.propTypes = {
  onSearch: PropTypes.func
};

Search.defaultProps={
  onSearch: null,
}

function Search(props) {

  const {onSearch}= props;

  const handleChange=(e)=>{
    // console.log(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="input-group">
      <div className="input-group-float">
        <input
          className="form-control"
          type="text"
          placeholder="Nhập từ khóa"
          name="keywork"
          onChange={handleChange}
        ></input>
        <span className="input-btn">
          <a className="btn-search btn btn-danger">Tìm kiếm</a>
        </span>
      </div>
    </div>
  );
}

export default Search;
