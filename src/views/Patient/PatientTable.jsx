 
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
import {restorePatient,setStateModal,deletePatient} from '../../redux/action/patientAction'

PatientTable.propTypes = {
    pagination: PropTypes.object,
    data : PropTypes.array,
    isLoading:  PropTypes.bool,
    handleChangePage : PropTypes.func,
 
};
PatientTable.defaultProps = {
    pagination : {
        limit : 5,
        totalRows: 1,
        page : 1
    },
    data : [],
    isLoading : false,
    handleChangePage: null,   
}

function PatientTable({data, pagination, isLoading, handleChangePage}) {
    const newPagination = pagination || {limit : 10,totalRows: 1,page : 1}
    const stateModal = useSelector(state => state.statePatientModalReducer);
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Mã số',
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
            title: 'Hoạt động',
            dataIndex: 'activeFlag',
            key: 'activeFlag',
            render : item => {
                const color = item === 1 ? 'green' : 'volcano'
                const result = item === 1 ? 'Hoạt động' : 'Dừng hoạt động'
                return <Tag color={color}  >
                            {result}
                        </Tag>
            }
        },{
            title : '+',
            dataIndex: 'action',
            align : 'center',
            render: (_,item)=>(
                <Space>
                    <Button key={1} color="primary" onClick={()=> onHandleView(item)} >Xem</Button>
                    <Button  key={2} color="warning" onClick={()=> onHandleEdit(item)}>Sửa</Button>
                    {
                        item.activeFlag === 1 ? (<Popconfirm title="Bạn có chắc muốn xoá" 
                        onConfirm={ () => onHandleDelete(item)}>
                        <Button key={3} color="danger">Xoá</Button>
                    </Popconfirm>) : (<Popconfirm title="Bạn có chắc muốn khôi phục" 
                        onConfirm={ () => onHandleRestore(item)}>
                        <Button key={3} color="success">Khôi phục</Button>
                    </Popconfirm>)
                    }
                </Space>
            )
        },
    ]
    function onHandleRestore({id}){
        dispatch(restorePatient(id));
    }
    function onHandleDelete({id}){
       dispatch(deletePatient(id));
    }
    function onHandleEdit(item){
        dispatch(setStateModal({
            ...stateModal,
            visible : true,
            item : item,
            image : item.imageUrl,
        }))
    }
    function onHandleView(item){
        dispatch(setStateModal({
            ...stateModal,
            visible : true,
            viewOnly: true,
            item : item,
            image : item.imageUrl,
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
            }}   />
        </>
    );
}

export default PatientTable;