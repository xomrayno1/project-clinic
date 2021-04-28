import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    CardFooter
} from "reactstrap";
import { Image, List, message, DatePicker, Select, Form, Input, Button } from 'antd';

import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { getDoctor } from '../../redux/action/doctorAction';
import { createBooking } from '../../redux/action/bookingAction'
import user from 'user.svg'
import {useHistory}  from 'react-router-dom'


function BookingNext(props) {
    const { Option } = Select;
    const { doctorId } = useParams();
    const dispatch = useDispatch();
    const { doctor } = useSelector(state => state.doctor)
    const auth = useSelector(state => state.auth);
    const [dateBooking, setDateBooking] = useState('');
    const [timeBooking, setTimeBooking] = useState('');
    const history = useHistory();

    useEffect(() => {
        dispatch(getDoctor(doctorId));
    }, [])


    function onBooking({ reason }) {
        if (!dateBooking || !timeBooking) {
            message.error('Vui lòng chọn thời gian');
            return false;
        }
        const dateArr = dateBooking.split("/");
        const newDate = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`
        const dateTimeNew = `${newDate} ${timeBooking}`
        const form = {
            time: dateTimeNew,
            reason: reason,
            doctorId,
            userId: auth && auth.user && auth.user.id || 0,
            type: 1
        }
        console.log(form)
        dispatch(createBooking(form, history));
    
    }
    function onChange(value, dateString) {
        setDateBooking(dateString);
    }

    function handleChange(value) {
        setTimeBooking(value);
    }


    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="4">
                                        <Image
                                            width={200}
                                            src={doctor.imageUrl && `http://localhost:8080/${doctor.imageUrl}` || user}
                                        />
                                    </Col>
                                    <Col md="8">
                                        <List
                                            size="small"
                                            header={
                                                <>
                                                    <div>Họ tên : {doctor.name}</div>
                                                    <div>Chuyên ngành : {doctor.domain}</div>
                                                </>
                                            }
                                            footer={<div>Miễn phí đặt lịch</div>}
                                            dataSource={['']}
                                        />
                                    </Col>
                                </Row>

                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="12" >
                                        {doctor.description}
                                    </Col>
                                </Row>

                            </CardBody>

                        </Card>
                    </Col>
                </Row>
                <Row >
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <Form
                                    onFinish={onBooking}
                                >
                                    <Row>
                                        <Col md="12"  >
                                            <Form.Item label="Thời gian khám ">

                                                <DatePicker
                                                    
                                                    onChange={onChange}
                                                    format={"YYYY/MM/DD"}
                                                    placeholder="Chọn ngày khám"
                                                    style={{
                                                        width: '200px'
                                                    }}
                                                    bordered={true}
                                                    
                                                />
                                                <Select

                                                    style={{ width: 120 }}
                                                    onChange={handleChange}
                                                    placeholder="Chọn giờ khám"
                                                    size="middle"
                                                    style={{
                                                        width: '200px'
                                                    }}
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
                                            </Form.Item>
                                        </Col>
                                    </Row>



                                    <Row>
                                        <Col>
                                            <Form.Item label="Lý do khám" name="reason"
                                                rules={[{ required: true, message: 'Vui lòng nhập lý do khám!' }]}>
                                                <Input.TextArea />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Item >
                                                <Button type="primary" htmlType="submit">
                                                    Đặt lịch
                                                    </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Link to="/admin/booking">Back</Link>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default BookingNext;