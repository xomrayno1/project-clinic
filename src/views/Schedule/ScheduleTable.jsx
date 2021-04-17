
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import user from 'user.svg'
import hoso from 'hoso.svg'
import './style.css'
import {
    Row,
    Col,
    Button,
    Input,
    FormGroup,
    Label,
    Card,
    CardBody
} from "reactstrap";
import { Link } from 'react-router-dom'
import {
    Table,
    Space,
    Popconfirm,
    Tag,
    Modal,
    Select,
    Menu,
    Dropdown,
    Image
}
    from 'antd';


import { Form, Formik, Field, ErrorMessage } from 'formik';


import { useDispatch, useSelector } from 'react-redux'
import { createSchedule, deleteSchedule, fetchSchedule, updateStatusSshedule } from '../../redux/action/scheduleAction'
import { addResult, getResultBySchedule, setDataModalResult } from '../../redux/action/resultAction'
import Textarea from 'variables/Textarea';
import * as Yup from 'yup'

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
    const { result } = useSelector(state => state.result) || '';

    const [modalUpdate, setModalUpdate] = useState({
        visible: false,
        status: '',
        scheduleId: ''
    })
    const [modalView, setModalView] = useState({
        visible: false,
        item: '',
    })

    const [modalResult, setModalResult] = useState({
        visible: false,
        item: ''
    });
     
    const [preview, setPreview] = useState({
        previewVisible: false,
        previewTitle: '',
        previewImage: ''
    })

    const [fileImg, setFileImg] = useState(null);
    const formResultRef = useRef();

    function handleOnClickResult(item) {
        setModalResult({
            visible: true,
            item
        })
        dispatch(setDataModalResult(item.id, formResultRef));
    }
    function handleOnSubmitResult(data) {
        console.log(data)
        //create form data 
        var formData = new FormData();
        formData.append('scheduleId', modalResult.item.id);
        formData.append('doctorId',  modalResult.item.doctorId);
        formData.append('patientId',  modalResult.item.patientId);
        fileImg && formData.append('imageUpload', fileImg || null);
        formData.append('reasonDescribe', data.reasonDescribe);
        formData.append('diagnose', data.diagnose);
        formData.append('note', data.note);
        formData.append('reason', data.reason);
        formData.append('bloodPressure', data.bloodPressure);
        formData.append('height', data.height);
        formData.append('weight', data.weight);
        data.id && formData.append('id', data.id);
        ///dispatch 
        dispatch(addResult(formData, formResultRef, setModalResult, uploadRef));
    }
    const uploadRef = useRef();

    const columns = [
        {
            title: 'Mã số',
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
                    <Dropdown.Button overlay={() => (
                        <Menu  >
                            <Menu.Item key="1" onClick={() => setModalView({
                                ...modalView,
                                visible: true,
                                item
                            })}>
                                Xem
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => setModalUpdate({
                                ...modalUpdate,
                                visible: true,
                                status: item.status,
                                scheduleId: item.id
                            })} >
                                Trạng thái
                            </Menu.Item>
                            <Menu.Item key="3"  >
                                <Popconfirm title="Bạn có chắc muốn xoá"
                                    onConfirm={() => onHandleDelete(item)}>
                                    Xoá
                                </Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="4"
                                onClick={() => handleOnClickResult(item)}
                            >
                                Kết quả khám
                            </Menu.Item>
                        </Menu>
                    )}>
                        Hành động
                    </Dropdown.Button>

                </Space>
            )
        },
    ]

    function onHandleDelete({ id }) {
        dispatch(deleteSchedule(id));
    }
    function onHandleUpdateStatus() {
        setModalUpdate({
            ...modalUpdate,
            visible: false
        })
        const data = {
            status: modalUpdate.status,
            scheduleId: modalUpdate.scheduleId
        }
        dispatch(updateStatusSshedule(data));
    }
    const resultSchema = Yup.object({

        reason: Yup.string().required("Vui lòng không được để trống !"),
        reasonDescribe: Yup.string().required("Vui lòng không được để trống !"),
        bloodPressure: Yup.string().required("Vui lòng không được để trống !"),
        height: Yup.string().required("Vui lòng không được để trống !"),
        weight: Yup.string().required("Vui lòng không được để trống !"),
        diagnose: Yup.string().required("Vui lòng không được để trống !"),
        note: Yup.string().required("Vui lòng không được để trống !"),
    })

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
                                status: value
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


            <Modal
                title="Chi tiết "
                centered
                visible={modalResult.visible}
                footer={null}
                keyboard={true}
                onCancel={() => setModalResult({
                    ...modalResult,
                    visible: false
                })}
                zIndex={10000}
                width={1000}
            >
                <Formik
                    onSubmit={handleOnSubmitResult}
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={{
                        doc_name: modalResult.item && modalResult.item.doctor_name || '',
                        pati_name: modalResult.item && modalResult.item.patient_name || '',
                        reason: '',
                        reasonDescribe: '',
                        bloodPressure: '',
                        height: '',
                        weight: '',
                        diagnose: '',
                        note: '',
                         
                        id: ''
                    }}
                    validationSchema={resultSchema}
                    innerRef={formResultRef}

                >
                    <Form>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label >Tên bác sĩ</Label>
                                    <Field className="form-control" name="doc_name" disabled />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label >Tên bệnh nhân</Label>
                                    <Field className="form-control" name="pati_name" disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label >Nguyên nhân khám</Label>
                                    <Field className="form-control" name="reason" />
                                    <ErrorMessage className="error-text" name="reason" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Textarea name="reasonDescribe" className="form-control" label="Nguyên nhân khám chi tiết" />
                                    <ErrorMessage className="error-text" name="reasonDescribe" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label >Huyết áp</Label>
                                    <Field className="form-control" name="bloodPressure" />
                                    <ErrorMessage className="error-text" name="bloodPressure" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label >Chiều cao (cm)</Label>
                                    <Field className="form-control" name="height" />
                                    <ErrorMessage className="error-text" name="height" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label >Cân nặng (kg)</Label>
                                    <Field className="form-control" name="weight" />
                                    <ErrorMessage className="error-text" name="weight" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Textarea label="Chẩn đoán của bác sĩ"
                                        className="form-control"
                                        name="diagnose" />
                                    <ErrorMessage className="error-text" name="diagnose" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label >Ghi chú</Label>
                                    <Textarea name="note" className="form-control" />
                                    <ErrorMessage className="error-text" name="note" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label >Upload ảnh</Label>
                                    <Field
                                        className="form-control"
                                        type="file"
                                        name="image_upload"
                                        onChange={(e) => {
                                            setFileImg(e.target.files[0])
                                        }}
                                        ref={uploadRef}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <Card>
                                    <CardBody className="text-center">
                                        <img onClick={() => setPreview({
                                            previewVisible: true
                                        })}
                                            src={
                                                result.image_upload && `http://localhost:8080/${result.image_upload}` || hoso
                                            }
                                            width="250" height="200px" />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="text-center">
                                <Button type="submit" color="primary">Lưu</Button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
            </Modal>
            <Modal
                visible={preview.previewVisible}
                title={preview.previewTitle}
                footer={null}
                onCancel={() => setPreview({
                    previewVisible: false
                })}
                zIndex={12000}
            >
                <img alt="example" style={{ width: '100%' }} src={
                    preview.previewImage && `http://localhost:8080/${preview.previewImage}`
                    || result.image_upload && `http://localhost:8080/${result.image_upload}`
                    || hoso
                } />
            </Modal>
        </>
    );
}

export default ScheduleTable;