import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import user from 'user.svg'
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
import {setStateModal, updateDoctor} from '../../redux/action/doctorAction'
import { useDispatch, useSelector } from 'react-redux';
ModalDoctor.propTypes = {
    
};

function ModalDoctor(props) {
    const [form] = Form.useForm();
    const stateModal = useSelector(state => state.stateDoctorModal);
    const {item} = stateModal;

    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [gender, setGender] = useState('male');
    const [file, setFile] =  useState(null);
 
    useEffect(()=>{
         if(item != null){
            form.setFieldsValue({
                name : item.name,
                // email: item.email,
                domain: item.domain,
                phone : item.phone,
                city : item.city,
                address : item.address,
                education: item.education,
                level : item.level,
                description : item.description,
                username: item.username,
                gender : item.gender,
                userId : item.userId,
                id : item.id
            })
            setGender(item.gender)
         }
    },[item]);

   

    function onFinish(data){
        console.log(data)
        //save
        const fd = new FormData();
         
        file &&  fd.append("imageUpload",file);
        fd.append("city", data.city);
        fd.append("phone", data.phone);
        fd.append("name", data.name);
        // fd.append("email", data.email);
        fd.append("address", data.address);
        fd.append("education", data.education);
        fd.append("level", data.level);
        fd.append("description", data.description);
        fd.append("gender", data.gender);
        fd.append("id", data.id);
        fd.append("userId", data.userId);
        fd.append("domain", data.domain)
        dispatch(updateDoctor(fd, onCancel))

   
        dispatch(setStateModal({
            ...stateModal,
            visible : true,

        }))
    }
    // function onHandleAddClick(){
    //     form.resetFields()
    //     setStateModal({
    //         ...stateModal,
    //         visible : true,
            
    //     })
    // }
    function handleOnChangeImage(e){
        setFile(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    function onCancel(){
        form.resetFields();
        dispatch(setStateModal({
            ...stateModal,
            visible : false,
            viewOnly:  false,
            image : null,
            item: null
        }))
        setImagePreview(null)
    }
   
    
    return (
        <Modal
            title="Thông tin bác sĩ"
            centered
            visible={stateModal.visible}
            onCancel={onCancel}
            footer={null}
            width={1000}
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
                    <Col md="4"/>
                    <Col md="4">
                        <Card > 
                            <CardImg top width="100%" height="200" 
                            src={
                                imagePreview === null 
                                ? (stateModal.image === null ? user :  `http://localhost:8080/${stateModal.image}`)
                                :  imagePreview
                            }
                            alt="Card image cap"/>
                        </Card>
                    </Col>
                    <Col md="4"/>
                </Row>
                <Row>
                    <Col md="6">
                        <Form.Item                
                            label="Tên tài khoản"
                            name="username"
                        >
                            <Input  disabled={true}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    <Col md="6"> 
                        <Form.Item
                            label="Tên bác sĩ"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên bác sĩ!' }]}
                        >
                            <Input disabled={stateModal.viewOnly} style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    {/* <Col md="4"> 
                        <Form.Item                
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }
                                     
                                    ]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col> */}
                </Row>
                <Row>
                    <Col md="4"> 
                        <Form.Item                
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    <Col md="4"> 
                        <Form.Item                
                            label="Giới tính"
                            name="gender"   
                        >
                           <Space>
                                <Radio.Group disabled={stateModal.viewOnly}   name="gender" 
                                    value={gender} 
                                    onChange={(e)=> setGender(e.target.value)}
                                >
                                    <Radio value="male" >Nam</Radio>
                                    <Radio value="female">Nữ</Radio>
                                </Radio.Group>
                           </Space>
                        </Form.Item>

                    {/* hidden */}
                        <Form.Item name="id" hidden={true}>    
                            <Input    />
                        </Form.Item>
                        <Form.Item name="userId" hidden={true}>    
                            <Input   />
                        </Form.Item>
                    </Col>
                    
                </Row>
                <Row>
                    <Col md="4">
                        <Form.Item                
                            label="Thành phố"
                            name="city"
                            rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    <Col md="8">
                        <Form.Item                
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <Form.Item                
                            label="Trường tốt nghiêp"
                            name="education"
                            rules={[{ required: true, message: 'Vui lòng nhập trường học!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    <Col md="4">
                        <Form.Item                
                            label="Chuyên khoa"
                            name="domain"
                            rules={[{ required: true, message: 'Vui lòng nhập chuyên môn!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    <Col md="4">
                        <Form.Item                
                            label="Trình độ"
                            name="level"
                            rules={[{ required: true, message: 'Vui lòng nhập trình độ!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>

                    <Col md="12">
                        <Form.Item                
                            label="Upload"
                            name="imageUpload"
                        >
                            <Input  type="file" 
                                onChange={handleOnChangeImage}
                                disabled={stateModal.viewOnly}
                                />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form.Item                
                            label="Chi tiết"
                            name="description"
                        >
                            <Input.TextArea  disabled={stateModal.viewOnly} style={{color: 'black'}}/>
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

export default ModalDoctor;