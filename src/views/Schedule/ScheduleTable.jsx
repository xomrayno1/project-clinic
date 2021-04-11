 
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import user from 'user.svg'
import {
    Row,
    Col,
    Button
  } from "reactstrap";

import {
    Table,
    Space,
    Popconfirm,
    Tag
} 
from 'antd';
import { useDispatch, useSelector} from 'react-redux'
import {createSchedule,deleteSchedule,fetchSchedule} from '../../redux/action/scheduleAction'
ScheduleTable.propTypes = {
    pagination: PropTypes.object,
    data : PropTypes.array,
    isLoading:  PropTypes.bool,
    handleChangePage : PropTypes.func,
};

function ScheduleTable({handleChangePage,isLoading,data,pagination}) {
    const newPagination = pagination || {limit : 10,totalRows: 1,page : 1}
    const dispatch = useDispatch();
    console.log(data)
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },{
            title: 'Tên bác sĩ',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
        },{
            title: 'Tên bệnh nhân',
            dataIndex: 'patient_name',
            key: 'patient_name',
        },{
            title: 'Thời gian khám',
            dataIndex: 'schedule_time',
            key: 'schedule_time',
        },{
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render : item => {
                const color = item === 1 ? 'green' : 'geekblue';
                const display = item === 1 ? 'Khám lần đầu' : 'Tái khám' 
                return (
                    <Tag color={color}> 
                        {display}
                    </Tag>
                )
            }
        },{
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render : item => {
                const color = item === 1 ? 'geekblue' : 'green';
                const display = item === 1 ? 'Đang đợi' : 'Đã hoàn thành' 
                return (
                    <Tag color={color}> 
                        {display}
                    </Tag>
                )
            }
        },{
            title : '+',
            dataIndex: 'action',
            align : 'center',
            render: (_,item)=>(
                <Space>
                    <Popconfirm title="Bạn có chắc muốn xoá" 
                        onConfirm={ () => onHandleDelete(item)}>
                        <Button key={3} color="danger">Xoá</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]
    
    function onHandleDelete({id}){
       dispatch(deleteSchedule(id));
    }
 
    return (
        <>
             <Table columns={columns}  
                loading={isLoading}  
                dataSource={data}
                pagination={{
                    pageSize: newPagination.limit,
                    current: newPagination.page,
                    total : newPagination.totalRows,
                    onChange: handleChangePage
                }}
                bordered={true}      
            />

        </>
    );
}

export default ScheduleTable;