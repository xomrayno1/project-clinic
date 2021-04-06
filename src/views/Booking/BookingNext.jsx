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
    Button,
    CardFooter
  } from "reactstrap";
import { Image,List, Select,Space } from 'antd';

import './style.css'
import { useDispatch,useSelector } from 'react-redux';
import {getDoctor} from '../../redux/action/doctorAction';
import user from 'user.svg'
 

function BookingNext(props) {
    const {Option} = Select
    const {doctorId} = useParams();
    const dispatch = useDispatch();
    const {doctor} = useSelector(state => state.doctor)
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];
    console.log(doctor)
    useEffect(()=>{
        dispatch(getDoctor(doctorId));
    },[])
    function handleChange(){
        console.log("log")
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
                                    src={doctor.imageUrl !== null ?   `http://localhost:8080/${doctor.imageUrl}`   : user   } 
                                />
                            </Col>
                            <Col md="8">
                                <List
                                    size="small"
                                    header={<div>  {doctor.name}</div>}
                                    footer={<div>Footer</div>}
                                    dataSource={data}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </Col>
                        </Row>
                        <Row  >
                           <Card>
                               <CardBody>
                                   <Row>
                                        <Col>
                                            <Select defaultValue="lucy"
                                                        style={{ width: 180, color: 'blue', fontSize: '16px',textAlign: 'center', fontWeight: 'bold' }}
                                                        onChange={handleChange}
                                            >
                                                <Option value="jack">Thứ 4 - 07/04</Option>
                                                <Option value="lucy">Thứ 5 - 08/04</Option>
                                            </Select>
                                        </Col>
                                   </Row>
                                   <Row>
                                        <Col>
                                            <Space>
                                                <Button color="info" style={{color: 'black', fontSize : '14px'}}>9:00</Button>
                                                <Button color="info" style={{color: 'black',fontSize : '14px'}}>9:30</Button>
                                                <Button color="info" style={{color: 'black', fontSize : '14px'}}>10:00</Button>
                                                <Button color="info" style={{color: 'black', fontSize : '14px'}}>9:00</Button>
                                                <Button color="info" style={{color: 'black',fontSize : '14px'}}>9:30</Button>
                                                <Button color="info" style={{color: 'black', fontSize : '14px'}}>10:00</Button>
                                                <Button color="info" style={{color: 'black', fontSize : '14px'}}>9:00</Button>
                                                <Button color="info" style={{color: 'black',fontSize : '14px'}}>9:30</Button>
                                                <Button color="info" style={{color: 'black', fontSize : '14px'}}>10:00</Button>
                                            </Space>
                                        </Col>
                                    </Row>
                               </CardBody>
                           </Card>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="12" >
                                Phó Giáo sư, Tiến sĩ, Bác sĩ Cao cấp Nguyễn Duy Hưng
                                Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp chuyên khoa Da liễu
                                Tốt nghiệp Đại học Y Hà Nội (1977)
                                Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương
                            </Col>
                        </Row>
                        
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