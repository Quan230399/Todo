import React from 'react';
import PropTypes from 'prop-types';

AddTask.propTypes = {
    onToggle: PropTypes.func,
    
};

AddTask.defaultProps={
    onToggle: null,
}

function AddTask(props) {
    
    const {onToggle}=props;

    const onToggleForm=()=>{
        if(!onToggle) return;
        onToggle();
    }

    return (
        <div>
            <a className='btn btn-danger' onClick={onToggleForm}> Thêm công việc</a>
        </div>
    );
}

export default AddTask;