
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
    Tag,
    Modal,
    Select
}
    from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { createSchedule, deleteSchedule, fetchSchedule } from '../../redux/action/scheduleAction'
ScheduleTable.propTypes = {
    pagination: PropTypes.object,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    handleChangePage: PropTypes.func,
};

function ScheduleTable({ handleChangePage, isLoading, data, pagination }) {
    const newPagination = pagination || { limit: 10, totalRows: 1, page: 1 }
    const dispatch = useDispatch();
    const { Option } = Select;
    const auth = useSelector(state => state.auth);
    const [modalUpdate, setModalUpdate] = useState({
        visible: false,
        status : '',
        scheduleId : ''
    })


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Tên bác sĩ',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
        }, {
            title: 'Tên bệnh nhân',
            dataIndex: 'patient_name',
            key: 'patient_name',
        }, {
            title: 'Thời gian khám',
            dataIndex: 'schedule_time',
            key: 'schedule_time',
        }, {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: item => {
                const color = item === 1 ? 'geekblue' : 'green';
                const display = item === 1 ? 'Khám lần đầu' : 'Tái khám'
                return (
                    <Tag color={color}>
                        {display}
                    </Tag>
                )
            }
        }, {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: item => {
                const color = item === 1 ? 'geekblue' : item === 2 ? 'green' : 'volcano';
                const display = item === 1 ? 'Đang đợi' : item === 2 ? 'Đã hoàn thành' : 'Đã huỷ'
                return (
                    <Tag color={color}>
                        {display}
                    </Tag>
                )
            }
        }, {
            title: '+',
            dataIndex: 'action',
            align: 'center',
            render: (_, item) => (
                <Space>
                    <Button key={1} color="success"
                        onClick={() => setModalUpdate({
                            ...modalUpdate,
                            visible: true,
                            status : item.status,
                            scheduleId: item.id
                        })}  
                    >Cập nhật</Button>
                    <Popconfirm title="Bạn có chắc muốn xoá"
                        onConfirm={() => onHandleDelete(item)}>
                        <Button key={3} color="danger">Xoá</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    function onHandleDelete({ id }) {
        dispatch(deleteSchedule(id));
    }
    function onHandleUpdateStatus(){
        setModalUpdate({
            ...modalUpdate,
            visible: false
        })
        console.log(modalUpdate)
    }

  
    return (
        <>
            <Table columns={columns}
                loading={isLoading}
                dataSource={data}
                pagination={{
                    pageSize: newPagination.limit,
                    current: newPagination.page,
                    total: newPagination.totalRows,
                    onChange: handleChangePage
                }}
                bordered={true}
            />
            <Modal
                title="Cập nhật trạng thái "
                visible={modalUpdate.visible}
                onCancel={() => setModalUpdate({
                    ...modalUpdate,
                    visible: false
                })}
                onOk={onHandleUpdateStatus}
                keyboard={true}
                centered={true}
                width={400}
            >
                <Row>
                    <Col md="12" className="text-center">
                        <Select 
                            placeholder="Chọn trạng thái" 
                            style={{
                                width: '150px'
                            }} 
                            className="center"
                            onChange={(value) => setModalUpdate({
                                ...modalUpdate,
                                status : value                                
                            })}
                            value={
                                modalUpdate.status == 1 ? 'Đang đợi' : modalUpdate.status == 2 ? 'Đã hoàn thành' : 'Đã huỷ'
                            }
                        >
                            <Option value="1">Đang đợi</Option>
                            <Option value="2">Đã hoàn thành</Option>
                            <Option value="3">Đã huỷ</Option>
                        </Select>
                    </Col>
                </Row>
            </Modal>

        </>
    );
}

export default ScheduleTable;