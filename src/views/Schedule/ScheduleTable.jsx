
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

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

import {
    Table,
    Space,
    Popconfirm,
    Tag,
    Modal,
    Select,
    Menu,
    Dropdown,
    Image,
    Spin
}
    from 'antd';
import * as Yup from 'yup'
import { Form, Formik, Field, ErrorMessage } from 'formik';


import { useDispatch, useSelector } from 'react-redux'
import { cancelSchedule, deleteSchedule, fetchSchedule, updateStatusSshedule } from '../../redux/action/scheduleAction'
import { addResult, getResultBySchedule, setDataModalResult } from '../../redux/action/resultAction'
import Textarea from 'variables/Textarea';
import user from 'user.svg'
import hoso from 'hoso.svg'
import './style.css'
import { cancelBooking } from '../../redux/action/bookingAction'

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

    const [loadingModal, setLoadingModal] = useState(false);

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
        console.log(item);
        console.log(formResultRef);
        setLoadingModal(true)
        setModalResult({
            visible: true,
            item
        })
        setTimeout(() => {
            setLoadingModal(false)
            dispatch(setDataModalResult(item.id, formResultRef));
        }, 300);

    }
    function handleOnSubmitResult(data) {
        console.log(data)
        // create form data 
        var formData = new FormData();
        formData.append('scheduleId', modalResult.item.id);
        formData.append('doctorId', modalResult.item.doctorId);
        formData.append('patientId', modalResult.item.patientId);
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
        dispatch(addResult(formData, formResultRef, setModalResult));
    }


    const columns = [
        {
            title: 'M?? s???',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'T??n b??c s??',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
        }, {
            title: 'T??n b???nh nh??n',
            dataIndex: 'patient_name',
            key: 'patient_name',
        }, {
            title: 'Th???i gian kh??m',
            dataIndex: 'schedule_time',
            key: 'schedule_time',
        }, {
            title: 'Lo???i',
            dataIndex: 'type',
            key: 'type',
            render: item => {
                const color = item === 1 ? 'geekblue' : 'green';
                const display = item === 1 ? 'Kh??m l???n ?????u' : 'T??i kh??m'
                return (
                    <Tag color={color}>
                        {display}
                    </Tag>
                )
            }
        }, {
            title: 'T??nh tr???ng',
            dataIndex: 'status',
            key: 'status',
            render: item => {
                const color = item === 1 ? 'geekblue' : item === 2 ? 'green' : 'volcano';
                const display = item === 1 ? '??ang ?????i' : item === 2 ? '???? ho??n th??nh' : '???? hu???'
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
            render: (_, item) => item.status !== 3 ? (
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
                                Tr???ng th??i
                            </Menu.Item>
                            <Menu.Item key="3"  >
                                <Popconfirm title="B???n c?? ch???c mu???n xo??"
                                    onConfirm={() => onHandleDelete(item)}>
                                    Xo??
                                </Popconfirm>
                            </Menu.Item>
                            {                                
                                 auth.user.roles[0].authority !== 'ROLE_ADMIN' ?  <Menu.Item key="3"  >
                                    <Popconfirm title="B???n c?? ch???c mu???n hu??? l???ch kh??m"
                                        onConfirm={() => onCancelSchedule(item)}>
                                        Hu??? l???ch kh??m
                                    </Popconfirm>
                                </Menu.Item> : ''
                            }
                            <Menu.Item key="4"
                                onClick={() => handleOnClickResult(item)}
                            >
                                K???t qu??? kh??m
                            </Menu.Item>
                        </Menu>
                    )}>
                        H??nh ?????ng
                    </Dropdown.Button>
                </Space>
            ) : ""
        },
    ]
    function onCancelSchedule({ id }) {
        dispatch(cancelSchedule(id))
    }
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
        reason: Yup.string().required("Vui l??ng kh??ng ???????c ????? tr???ng !"),
        reasonDescribe: Yup.string().required("Vui l??ng kh??ng ???????c ????? tr???ng !"),
        bloodPressure: Yup.string().required("Vui l??ng kh??ng ???????c ????? tr???ng !"),
        height: Yup.string().required("Vui l??ng kh??ng ???????c ????? tr???ng !"),
        weight: Yup.string().required("Vui l??ng kh??ng ???????c ????? tr???ng !"),
        diagnose: Yup.string().required("Vui l??ng kh??ng ???????c ????? tr???ng !"),
        note: Yup.string().required("Vui l??ng kh??ng ???????c ????? tr???ng !"),
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
                title="C???p nh???t tr???ng th??i "
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
                            placeholder="Ch???n tr???ng th??i"
                            style={{
                                width: '150px'
                            }}
                            className="center"
                            onChange={(value) => setModalUpdate({
                                ...modalUpdate,
                                status: value
                            })}
                            value={
                                modalUpdate.status == 1 ? '??ang ?????i' : modalUpdate.status == 2 ? '???? ho??n th??nh' : '???? hu???'
                            }
                        >
                            <Option value="1">??ang ?????i</Option>
                            <Option value="2">???? ho??n th??nh</Option>
                            <Option value="3">???? hu???</Option>
                        </Select>
                    </Col>
                </Row>
            </Modal>
            <Modal
                title="Chi ti???t "
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
                            <label>T??n b??c s??</label>
                            <Input type="text" disabled value={modalView.item.doctor_name} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <label>T??n b???nh nh??n</label>
                            <Input type="text" disabled value={modalView.item.patient_name} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <label>Th???i gian</label>
                            <Input type="text" disabled value={modalView.item.schedule_time} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label>Lo???i kh??m</label>
                            <Input type="text" disabled value={modalView.item.type === 1 ? 'Kh??m l???n ?????u' : 'T??i kh??m'} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <label>T??nh tr???ng</label>
                            <Input type="text" disabled value={modalView.item.status === 1 ? '??ang ?????i' : modalView.item.status === 2 ? 'Ho??n th??nh' : '???? h???y'} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <label>Nguy??n nh??n </label>
                            <Input type="textarea" disabled value={modalView.item.reason} />
                        </FormGroup>
                    </Col>
                </Row>
            </Modal>



            <Modal
                title="K???t qu??? kh??m "
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
                <Spin spinning={loadingModal}>
                    <Formik
                        onSubmit={handleOnSubmitResult}
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={{
                            // doc_name: '',
                            // pati_name: '',
                            reason: '',
                            reasonDescribe: '',
                            bloodPressure: '',
                            height: '',
                            weight: '',
                            diagnose: '',
                            note: '',
                            id: ''
                        }}
                        // validationSchema={resultSchema}
                        innerRef={formResultRef}

                    >
                        <Form>
                            {/* <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label >T??n b??c s??</Label>
                                        <Field className="form-control" name="doc_name" disabled />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label >T??n b???nh nh??n</Label>
                                        <Field className="form-control" name="pati_name" disabled />
                                    </FormGroup>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label >Nguy??n nh??n kh??m</Label>
                                        <Field className="form-control" name="reason" />
                                        <ErrorMessage className="error-text" name="reason" component="div" />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Textarea name="reasonDescribe" className="form-control" label="Nguy??n nh??n kh??m chi ti???t" />
                                        <ErrorMessage className="error-text" name="reasonDescribe" component="div" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label >Huy???t ??p</Label>
                                        <Field className="form-control" name="bloodPressure" />
                                        <ErrorMessage className="error-text" name="bloodPressure" component="div" />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label >Chi???u cao (cm)</Label>
                                        <Field className="form-control" name="height" />
                                        <ErrorMessage className="error-text" name="height" component="div" />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label >C??n n???ng (kg)</Label>
                                        <Field className="form-control" name="weight" />
                                        <ErrorMessage className="error-text" name="weight" component="div" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Textarea label="Ch???n ??o??n c???a b??c s??" className="form-control" name="diagnose" />
                                        <ErrorMessage className="error-text" name="diagnose" component="div" />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label >Ghi ch??</Label>
                                        <Textarea name="note" className="form-control" />
                                        <ErrorMessage className="error-text" name="note" component="div" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label >Upload ???nh</Label>
                                        <Field
                                            className="form-control"
                                            type="file"
                                            name="image_upload"
                                            onChange={(e) => {
                                                setFileImg(e.target.files[0])
                                            }}

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
                                    <Button type="submit" color="primary">L??u</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Formik>
                </Spin>
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