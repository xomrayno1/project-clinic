import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
 
PatientSearch.propTypes = {
    handleSearch : PropTypes.func
};
PatientSearch.defaultProps = {
    handleSearch : null
}

function PatientSearch({handleSearch}) {
    function handleOnSearch(e){
        if(!handleSearch) return;
        handleSearch(e.target.value)
    }
    function debounceEventHandler(...args) {
        const debounced = _.debounce(...args)
        return function(e) {
          e.persist()
          return debounced(e)
        }
      }
    
    return (
        <div className="text-right">
            <input  type="text" placeholder="Nhập tìm kiếm..." className="form-control"
                onChange={debounceEventHandler(handleOnSearch, 500)}  
            />
        </div>
    );
}

export default PatientSearch;