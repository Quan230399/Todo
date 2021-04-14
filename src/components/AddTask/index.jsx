import React from 'react';
import PropTypes from 'prop-types';


function AddTask(props) {

    const {onToggle}=props;

    const onToggleForm=()=>{
        if(!onToggle) return;
        onToggle();
    }

    return (
        <div>
            <button type="button" className='btn btn-danger' onClick={onToggleForm}> Thêm công việc</button>
        </div>
    );
}


AddTask.propTypes = {
  onToggle: PropTypes.func,

};

AddTask.defaultProps={
  onToggle: null,
}

export default AddTask;
