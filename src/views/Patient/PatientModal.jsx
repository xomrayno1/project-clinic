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
import {setStateModal, updatePatient} from '../../redux/action/patientAction'
import { useDispatch, useSelector } from 'react-redux';
function PatientModal(props) {
    const [form] = Form.useForm();
    const stateModal = useSelector(state => state.statePatientModal);
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
                phone : item.phone,
                address : item.address,
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
        fd.append("phone", data.phone);
        fd.append("name", data.name);
        // fd.append("email", data.email);
        fd.append("address", data.address);
        fd.append("description", data.description);
        fd.append("gender", data.gender);
        fd.append("id", data.id);
        fd.append("userId", data.userId);
  
        dispatch(updatePatient(fd, onCancel)) ////
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
            item: '',
            image : ''
        }))
        setImagePreview(null)
    }
    return (
        <Modal
            title="Th??ng tin b??c s??"
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
                                ?  (stateModal.image === null ? user :  `http://localhost:8080/${stateModal.image}`)
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
                            label="T??n t??i kho???n"
                            name="username"
                        >
                            <Input  disabled={true}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    <Col md="6"> 
                        <Form.Item
                            label="T??n b??c s??"
                            name="name"
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n b??c s??!' }]}
                        >
                            <Input disabled={stateModal.viewOnly} style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    {/* <Col md="4"> 
                        <Form.Item                
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui l??ng nh???p email!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col> */}
                </Row>
                <Row>
                    <Col md="4"> 
                        <Form.Item                
                            label="S??? ??i???n tho???i"
                            name="phone"
                            rules={[{ required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i!' }]}
                        >
                            <Input  disabled={stateModal.viewOnly}  style={{color: 'black'}}/>
                        </Form.Item>
                    </Col>
                    <Col md="4"> 
                        <Form.Item                
                            label="Gi???i t??nh"
                            name="gender"   
                        >
                        <Space>
                                <Radio.Group disabled={stateModal.viewOnly}   name="gender" 
                                    value={gender} 
                                    onChange={(e)=> setGender(e.target.value)}
                                >
                                    <Radio value="male" >Nam</Radio>
                                    <Radio value="female">N???</Radio>
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
                    
                    <Col md="8">
                        <Form.Item                
                            label="?????a ch???"
                            name="address"
                            rules={[{ required: true, message: 'Vui l??ng nh???p ?????a ch???!' }]}
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
                            label="Chi ti???t"
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
                                L??u
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col md="4"/>         
                </Row>
            </Form>
    </Modal>
    );
}

export default PatientModal;