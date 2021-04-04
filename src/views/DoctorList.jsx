import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Button
  } from "reactstrap";

import {
    Table,
    Space,
    Modal,
    Form,
    Input
} 
from 'antd';

function DoctorList(props) {
    const [visible, setVisible] = useState(false);
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },{
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
        },{
            title: 'Trình độ',
            dataIndex: 'level',
            key: 'level',
        },{
            title : '+',
            dataIndex: 'action',
            render: ()=>(
                <Space>
                    <Button color="primary" onClick={()=> setVisible(true)} >Xem</Button>
                    <Button color="warning">Sửa</Button>
                    <Button color="danger">Xoá</Button>
                </Space>
            )
        },
    ]
    const data = [
        {
            id : '1',
            name: 'Nguyen Van B',
            gender: 'male',
            level: 'Thạc sĩ'
        }
    ]
  
    return (
       <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Danh sách bác sĩ </CardTitle>
                </CardHeader>
                <CardBody>
                    <Table columns={columns}   dataSource={data}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
            <Modal
                title="Thông tin bác sĩ"
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={1000}
                zIndex={10000}
                keyboard={true}
            >    
                    <Form
                        name="basic"
                        initialValues={{
                            name: '',
                            descript: '',
                            phone: '',
                        }}
                    >
                        <Row> 
                            <Col md="4"> 
                                <Form.Item
                                    label="Tên bác sĩ"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md="4"> 
                                <Form.Item                
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md="4"> 
                                <Form.Item                
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[{ required: true, message: 'Please input your phone!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <Form.Item                
                                    label="Thành phố"
                                    name="city"
                                    rules={[{ required: true, message: 'Please input your city!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md="8">
                                <Form.Item                
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <Form.Item                
                                    label="Trường tốt nghiêp"
                                    name="education"
                                    rules={[{ required: true, message: 'Please input your education!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md="4">
                                <Form.Item                
                                    label="Chuyên khoa"
                                    name="domain"
                                    rules={[{ required: true, message: 'Please input your domain!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md="4">
                                <Form.Item                
                                    label="Trình độ"
                                    name="level"
                                    rules={[{ required: true, message: 'Please input your level!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Item                
                                    label="Chi tiết"
                                    name="description"
                                    rules={[{ required: true, message: 'Please input your description!' }]}
                                >
                                    <Input.TextArea/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4"/>
                            <Col md="4">
                                <Form.Item className="text-center">
                                    <Button  type="primary" htmlType="submit">
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col md="4"/>         
                        </Row>
                    </Form>
            </Modal>
        </div>
       </>
    );
}

export default DoctorList;