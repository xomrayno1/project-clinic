import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardImg,
    Row,
    Col,
    Button
  } from "reactstrap";

import {
    Table,
    Space,
    Modal,
    Form,
    Input,
    Popconfirm
}  from 'antd';
import { Radio } from 'antd';
import {setStateModal, updateUser} from '../../redux/action/userAction'
import { useDispatch, useSelector } from 'react-redux';
function UserModal(props) {
    const [form] = Form.useForm();
    const stateModal = useSelector(state => state.stateUserModal);
    const {item} = stateModal;

    const dispatch = useDispatch();
 
    useEffect(()=>{
         if(item != null){
            form.setFieldsValue({
                email: item.email,
                username: item.username,
                password : item.password,
                id : item.id
            })
         }
    },[item]);

    function onFinish(data){
        console.log(data)
    }
    function onHandleAddClick(){
        form.resetFields()
        setStateModal({
            ...stateModal,
            visible : true,
            
        })
    }

    function onCancel(){
        form.resetFields();
        dispatch(setStateModal({
            ...stateModal,
            visible : false,
            viewOnly:  false,
            item: ''
        }))
       
    }
    return (
        <Modal
            title="Thông tin tài khoản"
            centered
            visible={stateModal.visible}
            onCancel={onCancel}
            footer={null}
            width={500}
            zIndex={10000}
            keyboard={true}
        >    
            <Form
                name="basic"
                form={form}
                validateTrigger={true}
                onFinish={onFinish}
            
            >
              
                <Row>
                    <Col md="12">
                        <Form.Item                
                            label="Tên tài khoản"
                            name="username"
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form.Item                
                            label="Mật khẩu"
                            name="password"
                        >
                            <Input type="password" disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md="12"> 
                        <Form.Item                
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                </Row>
    
                <Row>
                    <Col md="4"/>
                    <Col md="4">
                        <Form.Item className="text-center">
                            <Button  type="primary" htmlType="submit"    disabled={stateModal.viewOnly}>
                                Lưu
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col md="4"/>         
                </Row>
            </Form>
    </Modal>
    );
}

export default UserModal;