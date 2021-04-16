import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import hoso from 'hoso.svg'
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
    Modal
}
    from 'antd';
import * as Yup from 'yup'
import Textarea from '../../variables/Textarea'
import { addResult, getResultBySchedule, setDataModalResult } from '../../redux/action/resultAction'
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux'

ResultTable.propTypes = {
    pagination: PropTypes.object,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    handleChangePage: PropTypes.func,
};


function ResultTable({ data, pagination, isLoading, handleChangePage }) {
    const newPagination = pagination || { limit: 10, totalRows: 1, page: 1 }

    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: 'Tên bác sĩ',
            dataIndex: 'doc_name',
            key: 'doc_name',
        }, {
            title: 'Tên bệnh nhân',
            dataIndex: 'pati_name',
            key: 'pati_name',
        }, {
            title: 'Triệu chứng',
            dataIndex: 'reason',
            key: 'reason',
        }, {
            title: '+',
            dataIndex: 'action',
            align: 'center',
            render: (_, item) => (
                <Space>
                    <Button key={1} color="primary" onClick={() => onHandleView(item)} >Xem</Button>
                    <Button key={2} color="warning" onClick={() => onHandleEdit(item)} >Sửa</Button>
                </Space>
            )
        },
    ]

    function onHandleEdit(item) {
        setModalResult({
            ...modalResult,
            visible: true,
            item,
            disabled: false
        })
    }
    function onHandleView(item) {
        console.log(item)
        setModalResult({
            ...modalResult,
            visible: true,
            item,
            disabled: true
        })
    }

    const { result } = useSelector(state => state.result) || '';
    const [modalResult, setModalResult] = useState({
        visible: false,
        item: '',
        disabled: false
    });
    const [preview, setPreview] = useState({
        previewVisible: false,
        previewTitle: '',
        previewImage: ''
    })
    const [fileImg, setFileImg] = useState(null);
    const formResultRef = useRef();

    function handleOnSubmitResult(data) {
        console.log(data)
        //create form data 
        var formData = new FormData();
        formData.append('scheduleId', data.scheduleId);
        formData.append('doctorId', data.doctorId);
        formData.append('patientId', data.patientId);
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
                }} />


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
                        doc_name: modalResult.item && modalResult.item.doc_name || '',
                        pati_name: modalResult.item && modalResult.item.pati_name || '',
                        doctorId: modalResult.item && modalResult.item.doctor_id || '',
                        patientId: modalResult.item && modalResult.item.pati_id || '',
                        reason: modalResult.item && modalResult.item.reason || '',
                        reasonDescribe: modalResult.item && modalResult.item.reason_describe || '',
                        bloodPressure: modalResult.item && modalResult.item.blood_pressure || '',
                        height: modalResult.item && modalResult.item.height || '',
                        weight: modalResult.item && modalResult.item.weight || '',
                        diagnose: modalResult.item && modalResult.item.diagnose || '',
                        note: modalResult.item && modalResult.item.note || '',
                        id: modalResult.item && modalResult.item.id || '',
                        scheduleId: modalResult.item && modalResult.item.schedule_id || '',
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
                                    <Field className="form-control" name="reason"
                                        disabled={modalResult.disabled} />
                                    <ErrorMessage className="error-text" name="reason" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Textarea name="reasonDescribe" className="form-control" label="Nguyên nhân khám chi tiết"
                                        disabled={modalResult.disabled} />
                                    <ErrorMessage className="error-text" name="reasonDescribe" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label >Huyết áp</Label>
                                    <Field className="form-control" name="bloodPressure"
                                        disabled={modalResult.disabled} />
                                    <ErrorMessage className="error-text" name="bloodPressure" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label >Chiều cao (cm)</Label>
                                    <Field className="form-control" name="height"
                                        disabled={modalResult.disabled} />
                                    <ErrorMessage className="error-text" name="height" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label >Cân nặng (kg)</Label>
                                    <Field className="form-control" name="weight"
                                        disabled={modalResult.disabled} />
                                    <ErrorMessage className="error-text" name="weight" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Textarea label="Chẩn đoán của bác sĩ"
                                        className="form-control"
                                        name="diagnose"
                                        disabled={modalResult.disabled}
                                    />
                                    <ErrorMessage className="error-text" name="diagnose" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label >Ghi chú</Label>
                                    <Textarea name="note" className="form-control"
                                        disabled={modalResult.disabled} />
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
                                        disabled={modalResult.disabled}
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
                                <Button type="submit" color="primary" disabled={modalResult.disabled}>Lưu</Button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
                <Row>
                    <Col md="12" className="text-right">
                        <Button type="submit" color="success"  >Gửi lịch hẹn</Button>
                    </Col>
                </Row>
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

export default ResultTable;