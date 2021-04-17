import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    CardTitle,
    Input,
    FormGroup
} from "reactstrap";
import {
    Table,
    Space,
    Popconfirm,
    Tag,
    DatePicker,
    Select,
    Button,
    Modal,
    Form,

}
    from 'antd';
import { fetchBooking, cancelBooking } from '../../redux/action/bookingAction'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory}  from 'react-router-dom'
function BookingList(props) {
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const schedules = useSelector(state => state.booking.schedules)
    const [date, setDate] = useState({
        dateTo: '',
        dateFrom: ''
    })
    const {totalRows, limit, page} = schedules.pagination || {totalRows:0, limit: 0, page :0, }
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(0);
    const [filter, setFilter] = useState({
        page: 1,
        limit: 5,
        search: '',
        status: 0,
        dateTo: '',
        dateFrom: '',
        key: 'patient',
        keyId: auth && auth.user && auth.user.id || 0
    });

    const [modalView, setModalView] = useState({
        visible: false,
        item: ''
    });


    function onChange(date, dateString) {
        dateString && setDate({
            dateTo: dateString[1],
            dateFrom: dateString[0],
        })
    }
    const columns = [
        {
            title: 'Mã số',
            dataIndex: 'id',
            key: 'id',
        },{
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
                const color = item === 1 ? 'geekblue'   : item === 2 ? 'green' : 'volcano';
                const display = item === 1 ? 'Đang đợi' : item === 2 ? 'Đã hoàn thành' : "Đã hủy"
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
                    <Button key={1} type="primary" onClick={() => onHandleView(item)} >Xem</Button>
                   
                    {item.status == 1 ? <Popconfirm title="Bạn có chắc muốn huỷ lịch"
                        onConfirm={() => onHandleCancel(item)}>
                        <Button key={3} type="danger">Huỷ lịch</Button>
                    </Popconfirm> : null
                    }
                </Space>
            )
        },
    ]
    useEffect(() => {
        dispatch(fetchBooking(filter));
    }, [filter])

    function onChangeStatus(value) {
        setStatus(value)
    }
    function onHandleCancel(item) {
        dispatch(cancelBooking(item.id));
    }
    function onHandleView(item) {
        setModalView({
            ...modalView,
            visible: true,
            item
        })
    }
    function handleSubmitSearch() {
        setFilter({
            ...filter,
            ...date,
            searchKey: search,
            status,
        })
        // const form = {
        //     ...date,
        //     searchKey : search,
        //     status,
        // }
        // console.log(form);
    }
    function handleChangePage(page){
        setFilter({
            ...filter,
            page
        })
    }
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Lịch khám của bạn</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col col="4">
                                        <RangePicker
                                            onChange={onChange}
                                            style={{
                                                width: '250px'
                                            }}
                                        />
                                    </Col>
                                    <Col col="2" >
                                        <Select placeholder="Tình trạng"
                                            onChange={onChangeStatus}
                                            style={{
                                                width: '150px',
                                                textAlign: 'center'
                                            }}>
                                            <Option value="0">Tất cả</Option>
                                            <Option value="1">Đang đợi</Option>
                                            <Option value="2">Đã hoàn thành</Option>
                                            <Option value="3">Đã huỷ</Option>
                                        </Select>
                                    </Col>
                                    <Col col="2">
                                        <input type="text"
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
                                <Row>
                                    <Col md="12">
                                        <Table
                                            dataSource={schedules.data}
                                            bordered={true}
                                            columns={columns}
                                            pagination={{
                                                pageSize: limit,
                                                current: page,
                                                total : totalRows,
                                                onChange: handleChangePage
                                            }}
                                        />    
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal
                title="Chi tiết "
                centered
                visible={modalView.visible}
                footer={null}
                keyboard={true}
                onCancel={() => setModalView({
                    ...modalView,
                    visible: false
                })}
                zIndex={10000}
            >
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label>Tên bác sĩ</label>
                            <Input type="text" disabled value={modalView.item.doctor_name} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <label>Tên bệnh nhân</label>
                            <Input type="text" disabled value={modalView.item.patient_name} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <label>Thời gian</label>
                            <Input type="text" disabled value={modalView.item.schedule_time} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                   <Col md="6">
                        <FormGroup>
                            <label>Loại khám</label>
                            <Input type="text" disabled value={modalView.item.type === 1 ? 'Khám lần đầu' : 'Tái khám'} />
                        </FormGroup>
                   </Col>
                    <Col md="6">
                        <FormGroup>
                            <label>Tình trạng</label>
                            <Input type="text" disabled value={modalView.item.status === 1 ? 'Đang đợi' : modalView.item.status === 2 ? 'Hoàn thành' : 'Đã hủy'} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <label>Nguyên nhân </label>
                            <Input type="textarea" disabled value={modalView.item.reason} />
                        </FormGroup>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default BookingList;