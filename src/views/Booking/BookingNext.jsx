import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardImg,
    Row,
    Col,
    CardFooter
} from "reactstrap";
import { Image, List,  message, DatePicker, TimePicker, Form, Input, Button } from 'antd';

import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { getDoctor } from '../../redux/action/doctorAction';
import user from 'user.svg'


function BookingNext(props) {

    const { doctorId } = useParams();
    const dispatch = useDispatch();
    const { doctor } = useSelector(state => state.doctor)
     
    const [dateTime,setDateTime] = useState('');

    useEffect(() => {
        dispatch(getDoctor(doctorId));
    }, [])

    
    function onBooking({reason}){
        if(!dateTime){
            message.error('Vui lòng chọn thời gian');
            return false;
        }
        const form = {
            date : dateTime,
            reason : reason
        }
        console.log(form);
    }
    function onChange(value, dateString) {
        setDateTime(dateString);    
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
                                            src={doctor.imageUrl !== null ? `http://localhost:8080/${doctor.imageUrl}` : user}
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
                                <Form onFinish={onBooking}>
                                    <Row>
                                        <Col md="12"  >
                                            <Form.Item label="Thời gian khám ">
                                               <DatePicker showTime onChange={onChange} 
                                                 placeholder="Chọn thời gian khám"/>
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