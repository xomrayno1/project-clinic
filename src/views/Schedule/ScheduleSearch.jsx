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
    const [status, setStatus] = useState(0);
    const [type, setType] = useState(0);

    function handleSubmitSearch(e){
        if(!handleSearch) return;
        const form = {
            keySearch : search,
            ...date,
            status,
            type
        }
        console.log(form)
        handleSearch(form);
    }
    function onChangeStatus(value){
        setStatus(value)
    }
    function onChangeType(value){
        setType(value)
    }
    function onChange(date,dateString){
        dateString && setDate({
            dateFrom : dateString[0],
            dateTo : dateString[1],   
        })
    }
    return (
        <>
        <Row>
            <Col col="4">
                <RangePicker 
                    onChange={onChange} 
                    style={{
                        width: '200px'
                    }}
                />
            </Col>
            <Col col="2" className="text-center">
                 <Select placeholder="Loại khám" 
                    onChange={onChangeType}
                    style={{
                        width: '150px',
                        textAlign : 'center'
                    }}>
                    <Option value="0">Tất cả</Option>
                    <Option value="1">Khám lần đầu</Option>
                    <Option value="2">Tái khám</Option>
                 </Select>
            </Col>
            <Col col="2" >
                 <Select placeholder="Tình trạng"
                    onChange={onChangeStatus}
                    style={{
                        width: '150px',
                        textAlign : 'center'
                    }}>
                    <Option value="0">Tất cả</Option>
                    <Option value="1">Đang đợi</Option>
                    <Option value="2">Đã hoàn thành</Option>
                    <Option value="3">Đã huỷ</Option>
                 </Select>
            </Col>
            <Col col="2">
                <input  type="text" 
                    placeholder="Nhập tìm kiếm..." 
                    className="form-control"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Col>
            <Col col="2">
                <Button type="primary" onClick={handleSubmitSearch}>Tìm kiếm</Button>
            </Col>
        </Row>
     </>
    );
}

export default ScheduleSearch;