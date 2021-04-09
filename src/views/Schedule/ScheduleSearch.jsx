import React, { useState  } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import {
    Row,Col
} from 'reactstrap'
import {Select,Button,DatePicker} from 'antd'
ScheduleSearch.propTypes = {
    handleSearch : PropTypes.func
};
function ScheduleSearch({handleSearch}) {
    const {Option} = Select;
    const { RangePicker } = DatePicker;
    const [search, setSearch] = useState('');
    const [date, setDate]  = useState({
        dateTo : '',
        dateFrom : ''
    })
    function handleSubmitSearch(e){
        if(!handleSearch) return;
        const form = {
            keySearch : search,
            ...date
        }
        console.log(form)
        handleSearch(form);
    }
    function onChange(date,dateString){
        dateString && setDate({
            // dateTo: `${dateString[0]} 00:00:00`,
            // dateFrom: `${dateString[1]} 24:00:00`,
            dateTo : dateString[0],
            dateFrom : dateString[1],
        })
    }
    return (
        <>
        <Row>
            <Col col="6">
                <RangePicker onChange={onChange}  />
            </Col>
            <Col col="3">
                <input  type="text" 
                    placeholder="Nhập tìm kiếm..." 
                    className="form-control"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Col>
            <Col col="3">
                <Button type="primary" onClick={handleSubmitSearch}>Tìm kiếm</Button>
            </Col>
        </Row>
     </>
    );
}

export default ScheduleSearch;