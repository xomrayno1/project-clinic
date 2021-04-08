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
import { Image, List,  message, DatePicker, Select , Form, Input, Button } from 'antd';

import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { getDoctor } from '../../redux/action/doctorAction';
import user from 'user.svg'


function BookingNext(props) {
    const { Option } = Select;
    const { doctorId } = useParams();
    const dispatch = useDispatch();
    const { doctor } = useSelector(state => state.doctor)
     
    const [dateBooking,setDateBooking] = useState('');
    const [timeBooking,setTimeBooking] = useState('');

    useEffect(() => {
        dispatch(getDoctor(doctorId));
    }, [])

    
    function onBooking({reason}){
        if(!dateBooking || !timeBooking){
            message.error('Vui lòng chọn thời gian');
            return false;
        }
        const form = {
            date : dateBooking,
            time : timeBooking,
            reason : reason
        }
        console.log(form);
    }
    function onChange(value, dateString) {
        setDateBooking(dateString);    
    }
 
    function handleChange(value) {
        console.log(`selected ${value}`);
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
                                               {/* <DatePicker showTime onChange={onChange} 
                                                 placeholder="Chọn thời gian khám"/> */}
                                                <DatePicker  onChange={onChange} 
                                                    format={"YYYY/MM/DD"}
                                                    placeholder="Chọn ngày khám"
                                                    style={{
                                                        width : '200px'
                                                     }}   
                                                />
                                                <Select  
                                                     style={{ width: 120 }} 
                                                     onChange={handleChange}
                                                     placeholder="Chọn giờ khám"
                                                     size="middle"
                                                     style={{
                                                        width : '200px'
                                                     }}
                                                >
                                                    <Option value="08">08:00</Option>
                                                    <Option value="09">09:00</Option>
                                                    <Option value="10">10:00</Option>
                                                    <Option value="11">11:00</Option>
                                                    <Option value="14">14:00</Option>
                                                    <Option value="15">15:00</Option>
                                                    <Option value="16">16:00</Option>
                                                    <Option value="17">17:00</Option>
                                                    <Option value="18">18:00</Option>
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