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
import moment from 'moment'
import {
    Table,
    Space,
    Popconfirm,
    Tag,
    Modal,
    DatePicker,
    Select,
    Spin
}
    from 'antd';
import * as Yup from 'yup'
import Textarea from '../../variables/Textarea'
import { addResult, getResultBySchedule, setDataModalResult } from '../../redux/action/resultAction'
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { sendSchedule } from '../../redux/action/scheduleAction';
import { date } from 'yup/lib/locale';

ResultTable.propTypes = {
    pagination: PropTypes.object,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    handleChangePage: PropTypes.func,
};


function ResultTable({ data, pagination, isLoading, handleChangePage }) {
    const newPagination = pagination || { limit: 10, totalRows: 1, page: 1 }
    const auth = useSelector(state => state.auth);

    var dateAdd = moment().add(5, 'days');
    var someDate = moment(dateAdd, "DD/MM/YYYY");
   
    const dispatch = useDispatch();

    const [loadingModal, setLoadingModal] = useState(false);

    const columns = [
        {
            title: 'Mã số',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Mã lịch khám',
            dataIndex: 'schedule_id',
            key: 'schedule_id',
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
                    {
                        auth && auth.user.roles[0].authority !== 'ROLE_PATIENT' && (<>
                            <Button key={2} color="warning" onClick={() => onHandleEdit(item)} >Sửa</Button>
                            <Button type="submit" color="success" onClick={() => handleOnClickSend(item)} >Gửi lịch hẹn</Button>
                        </>)
                    }
                </Space>
            )
        },
    ]

    function onHandleEdit(item) {
        setLoadingModal(true)
        setModalResult({
            ...modalResult,
            visible: true,
            item,
            disabled: false
        })
        setTimeout(() => {
            formResultRef.current.setValues({
                doc_name: item.doc_name || '',
                pati_name: item.pati_name || '',
                doctorId: item.doctor_id || '',
                patientId: item.pati_id || '',
                reason: item.reason || '',
                reasonDescribe: item.reason_describe || '',
                bloodPressure: item.blood_pressure || '',
                height: item.height || '',
                weight: item.weight || '',
                diagnose: item.diagnose || '',
                note: item.note || '',
                id: item.id || '',
                scheduleId: item.schedule_id || '',
            })
            setLoadingModal(false)
        }, 300)
    }
    function onHandleView(item) {
        setLoadingModal(true)
        setModalResult({
            ...modalResult,
            visible: true,
            item,
            disabled: true
        })
        setTimeout(() => {
            formResultRef.current.setValues({
                doc_name: item.doc_name || '',
                pati_name: item.pati_name || '',
                doctorId: item.doctor_id || '',
                patientId: item.pati_id || '',
                reason: item.reason || '',
                reasonDescribe: item.reason_describe || '',
                bloodPressure: item.blood_pressure || '',
                height: item.height || '',
                weight: item.weight || '',
                diagnose: item.diagnose || '',
                note: item.note || '',
                id: item.id || '',
                scheduleId: item.schedule_id || '',
            })
            setLoadingModal(false)
        }, 300)
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
    const { Option } = Select
    const [modalSend, setModalSend] = useState({
        visible: false,
        doctorId: '',
        patientId: '',
        date: '',
        time: '08:00:00'
    });

    function handleOnClickSend(item) {
        console.log(item);
        setModalSend({
            ...modalSend,
            visible: true,
            patientId: item.pati_id,
            doctorId: item.doctor_id
        })
    }
    function handleOnSend() {
        let dateTimeNew = '';
        if(modalSend.date){
            const dateArr = modalSend.date.split("/");
            const newDate = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`
            dateTimeNew = `${newDate} ${modalSend.time}`
        }else{
            dateTimeNew = `${someDate.format("YYYY-MM-DD")} ${modalSend.time}`
        }
         
        console.log(dateTimeNew)
        const form = {
            time: dateTimeNew,
            doctorId: modalSend.doctorId,
            patientId: modalSend.patientId
        }
        dispatch(sendSchedule(form));
        setModalSend({
            ...modalSend,
            visible: false
        })
    }
    function handleOnChangeDate(value, dateString) {
        console.log(dateString)
        setModalSend({
            ...modalSend,
            date: `${dateString}`
        })
    }
    function handleChangeTime(value) {
        setModalSend({
            ...modalSend,
            time: `${value}`
        })
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
                <Spin spinning={loadingModal}> 
                    <Formik
                        onSubmit={handleOnSubmitResult}
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={{
                            doc_name: '',
                            pati_name: '',
                            doctorId: '',
                            patientId: '',
                            reason: '',
                            reasonDescribe: '',
                            bloodPressure: '',
                            height: '',
                            weight: '',
                            diagnose: '',
                            note: '',
                            id: '',
                            scheduleId: '',
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
                                                    modalResult.item && modalResult.item.image_upload && `http://localhost:8080/${modalResult.item.image_upload}` || hoso
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
                    modalResult.item && modalResult.item.image_upload && `http://localhost:8080/${modalResult.item.image_upload}` || hoso
                } />
            </Modal>
            <Modal
                title="Gửi lịch hẹn"
                visible={modalSend.visible}
                footer={null}
                onCancel={() => setModalSend({
                    ...modalSend,
                    visible: false,
                })}
            >
                <Row>
                    <Col md="12" className="text-center">
                        <DatePicker
                            zIndex={15000}
                            onChange={handleOnChangeDate}

                            format={"YYYY/MM/DD"}
                            defaultValue={someDate}
                            defaultPickerValue={someDate}
                            placeholder="Chọn ngày khám"
                            style={{
                                width: '200px'
                            }}
                            bordered={true}
                        />
                        <Select
                            style={{ width: 120 }}
                            onChange={handleChangeTime}
                            placeholder="Chọn giờ khám"
                            size="middle"
                            style={{
                                width: '200px'
                            }}
                            defaultValue="08:00:00"
                        >
                            <Option value="08:00:00">08:00</Option>
                            <Option value="09:00:00">09:00</Option>
                            <Option value="10:00:00">10:00</Option>
                            <Option value="11:00:00">11:00</Option>
                            <Option value="14:00:00">14:00</Option>
                            <Option value="15:00:00">15:00</Option>
                            <Option value="16:00:00">16:00</Option>
                            <Option value="17:00:00">17:00</Option>
                            <Option value="18:00:00">18:00</Option>
                        </Select>
                    </Col>

                </Row>
                <Row>
                    <Col md="12" className="text-center">
                        <Button type="primary" onClick={handleOnSend}>Gửi</Button>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default ResultTable;