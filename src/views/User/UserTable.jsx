 
 
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import {
    Button
  } from "reactstrap";

import {
    Table,
    Space,
    Popconfirm,
} 
from 'antd';
import { useDispatch, useSelector} from 'react-redux'
import {fetchUser,setStateModal} from '../../redux/action/userAction'

UserTable.propTypes = {
    pagination: PropTypes.object,
    data : PropTypes.array,
    isLoading:  PropTypes.bool,
    handleChangePage : PropTypes.func,
};
UserTable.defaultProps = {
    pagination : {
        limit : 5,
        totalRows: 1,
        page : 1
    },
    data : [],
    isLoading : false,
    handleChangePage: null,   
}
function UserTable({pagination,data,isLoading,handleChangePage}) {
    const stateModal = useSelector(state => state.stateUserModal);
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
        dispatch(setStateModal({
            ...stateModal,
            visible : true,
            item : item
        }))
    }
    function onHandleView(item){
        dispatch(setStateModal({
            ...stateModal,
            visible : true,
            viewOnly: true,
            item : item
        }))
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
            }}  />
        </>
    );
}

export default UserTable;