

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import {
    Button
} from "reactstrap";

import {
    Table,
    Space,
    Popconfirm,
    Tag,
}
    from 'antd';

import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUser, restoreUser, setStateModal } from '../../redux/action/userAction'


UserTable.propTypes = {
    pagination: PropTypes.object,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    handleChangePage: PropTypes.func,
};
UserTable.defaultProps = {
    pagination: {
        limit: 5,
        totalRows: 1,
        page: 1
    },
    data: [],
    isLoading: false,
    handleChangePage: null,
}
function UserTable({ pagination, data, isLoading, handleChangePage }) {
    const stateModal = useSelector(state => state.stateUserModal);
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Mã số',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Role',
            dataIndex: 'roles',
            render: roles => {
                console.log(roles)
                return (
                    roles.map((item, idx) => {
                        const color = item === 1 ? 'volcano' : (item === 2 ? 'geekblue' : 'green')
                        const display = item === 1 ? 'ROLE_ADMIN' : (item === 2 ? 'ROLE_DOCTOR' : 'ROLE_PATIENT')
                        return <>
                            <Space>
                                <Tag color={color} key={idx}>{display}</Tag>
                            </Space>
                        </>
                    })
                )
            },

        }, {
            title: 'Hoạt động',
            dataIndex: 'activeFlag',
            key: 'activeFlag',
            render: item => {
                const color = item === 1 ? 'green' : 'volcano'
                const result = item === 1 ? 'Hoạt động' : 'Dừng hoạt động'
                return <Tag color={color}  >
                    {result}
                </Tag>
            },

        }, {
            title: '+',
            dataIndex: 'action',
            align: 'center',
            render: (_, item) => (
                <Space>
                    <Button key={1} color="primary" onClick={() => onHandleView(item)} >Xem</Button>
                    <Button key={2} color="warning" onClick={() => onHandleEdit(item)}>Sửa</Button>
                    {
                        item.activeFlag === 1 ? (<Popconfirm title="Bạn có chắc muốn xoá"
                            onConfirm={() => onHandleDelete(item)}>
                            <Button key={3} color="danger">Xoá</Button>
                        </Popconfirm>) : (<Popconfirm title="Bạn có chắc muốn khôi phục"
                            onConfirm={() => onHandleRestore(item)}>
                            <Button key={3} color="success">Khôi phục</Button>
                        </Popconfirm>)
                    }
                    {/* {
                        !item.roles.includes('ROLE_ADMIN') && <Button key={4} color="info"  onClick={()=> onHandleInfo(item)} >Hồ sơ</Button>   
                    } */}
                </Space>
            ),

        },
    ]
    function onHandleRestore({ id }) {
        dispatch(restoreUser(id));
    }
    function onHandleDelete({ id }) {
        dispatch(deleteUser(id));
    }
    function onHandleEdit(item) {
        dispatch(setStateModal({
            ...stateModal,
            visible: true,
            item: item
        }))
    }
    // function onHandleInfo(item){
    //    ( item.roles.includes('ROLE_DOCTOR') &&  item.roles.includes('ROLE_PATIENT')) 
    //     ? (
    //         dispatch(setStateModalDoctor({visible : true,viewOnly : false}))
    //     ) 
    //     : item.roles.map( value => {
    //         value === 'ROLE_DOCTOR' 
    //             ? dispatch(setStateModalDoctor({
    //                 visible : true,
    //                 viewOnly : false,
    //                 })) 
    //             : dispatch(setStateModalPatient({
    //                 visible : true,
    //                 viewOnly : false,
    //                 }))
    //     });
    // }
    function onHandleView(item) {
        dispatch(setStateModal({
            ...stateModal,
            visible: true,
            viewOnly: true,
            item: item
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
                    total: pagination.totalRows,
                    onChange: handleChangePage
                }} />
            {/* <ModalDoctor/>
            <PatientModal/> */}
        </>
    );
}

export default UserTable;