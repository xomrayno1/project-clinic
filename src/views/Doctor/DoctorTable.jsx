 
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
import {fetchDoctor} from '../../redux/action/doctorAction'
DoctorTable.propTypes = {
    pagination: PropTypes.object,
    data : PropTypes.array,
    isLoading:  PropTypes.bool,
    handleChangePage : PropTypes.func,
    handleEdit: PropTypes.func,
    handleView: PropTypes.func
};
DoctorTable.defaultProps = {
    pagination : {
        limit : 10,
        totalRows: 1,
        page : 1
    },
    data : [],
    isLoading : false,
    handleChangePage: null,
    handleEdit: null,
    handleView:null
}

function DoctorTable({data, pagination, isLoading, handleChangePage,handleEdit,handleView}) {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        // {
        //     title: 'Avatar',
        //     dataIndex: 'imageUrl',
        //     render : imageUrl => (
        //         <img width={50} height={100}  src={imageUrl === null ? user :  `http://localhost:8080/${imageUrl}`} alt={imageUrl} />
        //     )
        // }
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
        }
        ,{
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render : gender => (
                gender === 'male' ? 'Nam' : 'Nữ'
            )
        },{
            title: 'Trình độ',
            dataIndex: 'level',
            key: 'level',
        },{
            title : '+',
            dataIndex: 'action',
            align : 'center',
            render: (_,item)=>(
                <Space>
                    <Button key={1} color="primary" onClick={()=> onHandleView(item)} >Xem</Button>
                    <Button  key={2} color="warning" onClick={()=> onHandleEdit(item)}>Sửa</Button>
                    <Popconfirm title="Sure to delete" onConfirm={()=> console.log("log")}>
                        <Button key={3} color="danger">Xoá</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]
    function onHandleEdit(item){
        if(!handleEdit) return;
        handleEdit(item)
    }
    function onHandleView(item){
        if(!handleView) return;
        handleView(item)
    }
    return (
        <>
             <Table columns={columns}  
                loading={isLoading}  
                dataSource={data}
                pagination={{
                    pageSize: pagination.limit,
                    current: pagination.page,
                    total : pagination.totalRows,
                    onChange: handleChangePage
                }}   />
        </>
    );
}

export default DoctorTable;