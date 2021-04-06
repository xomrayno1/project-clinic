import React from 'react';
import { Link } from 'react-router-dom';
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

function BookingNext(props) {
    const {Option} = Select
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];
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
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                            </Col>
                            <Col md="8">
                                <List
                                    size="small"
                                    header={<div>Header</div>}
                                    footer={<div>Footer</div>}
                                    dataSource={data}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Select defaultValue="lucy"
                                        style={{ width: 180, color: 'blue', fontSize: '16px',textAlign: 'center', fontWeight: 'bold' }}
                                        onChange={handleChange}
                            >
                                <Option value="jack">Thứ 4 - 07/04</Option>
                                <Option value="lucy">Thứ 5 - 08/04</Option>
                            </Select>
                        </Row>
                        <Row>
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
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="12" >
                                
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