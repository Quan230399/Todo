
import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./index.css";

function Search(props) {

  const {onSearch}= props;
  const typingTimeoutRef  = useRef();

  const handleChange=(e)=>{
    // console.log(e.target.value);
   const {value} = e.target;

   if(!onSearch) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
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
         />
        <span className="input-btn">
          <button type="button" className="btn-search btn btn-danger">Tìm kiếm</button>
        </span>
      </div>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func
};

Search.defaultProps={
  onSearch: null,
}

export default Search;
