import React, { useReducer, useRef, useState  } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import {
    Row, Col
} from 'reactstrap'
import {Button, DatePicker,Form} from 'antd'

ResultSearch.propTypes = {
    handleSearch : PropTypes.func
};
function ResultSearch({handleSearch}) {
    const { RangePicker } = DatePicker;
    const searchRef = useRef();
    const [date, setDate]  = useState({
        dateTo : '',
        dateFrom : ''
    })
    function onChange(date,dateString){
        dateString && setDate({
            dateFrom : dateString[0],
            dateTo : dateString[1],   
        })
    }
    function handleSubmitSearch(e){
        if(!handleSearch) return;
        const form = {
            searchKey : searchRef.current.value,
            ...date,
        }
        console.log(form)
        handleSearch(form);
    }
    return (
        <>
           <Row>
                <Col md="6">
                    <RangePicker 
                            onChange={onChange} 
                            style={{
                                width: '350px'
                            }}
                        />
                </Col>
                    <Col md="4">
                        <div className="text-right">
                            <input  type="text" ref={searchRef} placeholder="Nhập tìm kiếm..." className="form-control"/>  
                        </div>
                    </Col>
                    <Col md="2">
                        <Button type="primary"  onClick={handleSubmitSearch}>Tìm kiếm</Button>
                    </Col>
           </Row>
        </>
    );
}

export default ResultSearch;