import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Button
} from "reactstrap";

import {
    Modal,
    Form,
    Input,
    Checkbox
} from 'antd';
import { setStateModal, updateUser,createUser } from '../../redux/action/userAction'
import { useDispatch, useSelector } from 'react-redux';

function UserModal(props) {
    const [form] = Form.useForm();
    const stateModal = useSelector(state => state.stateUserModal);
    const { item } = stateModal;
    const [roleCheckBox, setRoleCheckbox] = useState([]);
    const dispatch = useDispatch();
    const formRef = useRef();
    

    useEffect(() => {
        if (item != null) {
            form.setFieldsValue({
                email: item.email,
                username: item.username,
                password: item.password,
                id: item.id
            })
            setRoleCheckbox(item.roles);
        }
    }, [item]);

    function onFinish(data) {
      
        //dispatch theo ref
        const {id} = stateModal.item || {id: null}
        const form = {
            ...data,
            roles : roleCheckBox
        }
        if(id){
            form.id = id;
            dispatch(updateUser(form, onCancel));
        }else{
            dispatch(createUser(form, onCancel));
        }
        onCancel();
    }

    function onCancel() {
        form.resetFields();
        dispatch(setStateModal({
            ...stateModal,
            visible: false,
            viewOnly: false,
            item: ''
        }))
        setRoleCheckbox([])
    }
    const options = [
        { label: 'ROLE_ADMIN', value: 1 },
        { label: 'ROLE_DOCTOR', value: 2 },
        { label: 'ROLE_PATIENT', value: 3 },
    ];
    function onHandleCheckBoxRole(checkedValues) {
        setRoleCheckbox(checkedValues)
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
                ref={formRef}
            >

                <Row>
                    <Col md="12">
                        <Form.Item
                            label="Tên tài khoản"
                            name="username"
                        >
                            <Input disabled={stateModal.viewOnly} style={{ color: 'black' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                        >
                            <Input type="password" disabled={stateModal.viewOnly} style={{ color: 'black' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' },  
                            {
                                required: true,
                                type: "email",
                                message: "Định dạng email không chính xác!"
                            }]}
                        >
                            <Input disabled={stateModal.viewOnly} style={{ color: 'black' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form.Item
                            label="Roles"
                        >
                            <Checkbox.Group options={options}
                                value={roleCheckBox}
                                onChange={onHandleCheckBoxRole}
                                disabled={stateModal.viewOnly} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col md="4" />
                    <Col md="4">
                        <Form.Item className="text-center">
                            <Button type="primary" htmlType="submit" disabled={stateModal.viewOnly}>
                                Lưu
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col md="4" />
                </Row>
            </Form>
        </Modal>
    );
}

export default UserModal;