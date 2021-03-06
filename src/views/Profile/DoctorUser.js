
import React, { useEffect, useRef, useState } from "react";
import user from 'user.svg'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Textarea from "variables/Textarea";
import CardFooter from "reactstrap/lib/CardFooter";
import { useDispatch } from "react-redux";
import { getDoctorByUser, updateProfileDoctor, setModalInfo, updateUserInfo } from '../../redux/action/userAction'
import { useSelector } from "react-redux";

import { Spin } from 'antd'

function User(props) {
  const doctorProfileSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên"),
    // email: Yup.string().required("Vui lòng nhập email"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    gender: Yup.string().required("Vui lòng nhập giới tính"),
    domain: Yup.string().required("Vui lòng nhập chuyên nghành"),
    education: Yup.string().required("Vui lòng nhập  trường tốt nghiệp"),
    level: Yup.string().required("Vui lòng nhập trình độ"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    city: Yup.string().required("Vui lòng nhập thành phố"),
  })
  const doctorProfileRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { username } = auth.user || { username: '' };
  const { profile, isLoading } = auth || { profile: '', isLoading: false }

  const infoModalSchema = Yup.object({
    email: Yup.string().required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  })
  const modalRef = useRef();
  const formInfoRef = useRef();
  const [modal, setModal] = useState(false);
  function handleClickUpdateInfo() {
    dispatch(setModalInfo(auth.user.id || 0, formInfoRef));
    setModal(!modal);
  }
  function onHandleUpdateUserInfo() {
    dispatch(updateUserInfo(formInfoRef, setModal))
  }

  useEffect(() => {
    dispatch(getDoctorByUser(username, doctorProfileRef));
  }, []);

  function handleOnSubmit() {
    dispatch(updateProfileDoctor(doctorProfileRef));
  }

  return (
    <>

      <div className="content">
        <Spin spinning={isLoading}>
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("background-avatar.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={profile && profile.imageUrl && `http://localhost:8080/${profile.imageUrl}` || user}
                      />
                      <h5 className="title">{profile && profile.name || ''}</h5>
                    </a>
                    {/* <p className="description">{profile && profile.email || ''}</p> */}
                  </div>
                </CardBody>
                <CardFooter className="text-center">
                  <Button onClick={handleClickUpdateInfo} className="btn btn-round btn-success">Cập nhật tài khoản</Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Chỉnh sửa thông tin  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Formik
                    initialValues={{
                      name: '',
                      // email: '',
                      phone: '',
                      gender: 'male',
                      description: '',
                      domain: '',
                      education: '',
                      level: '',
                      address: '',
                      city: '',
                    }}
                    innerRef={doctorProfileRef}
                    onSubmit={handleOnSubmit}
                    validationSchema={doctorProfileSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                  >
                    <Form>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Tên</label>
                            <Field
                              placeholder="Tên"
                              type="text"
                              name="name"
                              className="form-control"
                            />
                            <ErrorMessage
                              component="div"
                              name="name"
                              className="error-text" />
                          </FormGroup>
                        </Col>
                        {/* <Col className="px-1" md="4">
                          <FormGroup>
                            <label>Email</label>
                            <Field
                              placeholder="Email"
                              type="email"
                              name="email"
                              className="form-control"
                            />
                            <ErrorMessage
                              component="div"
                              name="email"
                              className="error-text" />
                          </FormGroup>
                        </Col> */}
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Số điện thoại
                            </label>
                            <Field
                              placeholder="Số điện thoại"
                              type="text"
                              className="form-control"
                              name="phone"
                            />
                            <ErrorMessage
                              component="div"
                              name="phone"
                              className="error-text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Chuyên ngành</label>
                            <Field
                              placeholder="Chuyên ngành"
                              type="text"
                              className="form-control"
                              name="domain"
                            />
                            <ErrorMessage
                              component="div"
                              name="domain"
                              className="error-text" />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Tốt nghiệp</label>
                            <Field
                              placeholder="Tốt nghiệp"
                              type="text"
                              className="form-control"
                              name="education"
                            />
                            <ErrorMessage
                              component="div"
                              name="education"
                              className="error-text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup check>
                            <label>Giới tính</label>
                            <div className="text-center ">
                              <Label check>
                                <Field type="radio" name="gender" value="male" /> Nam
                                </Label>
                              <Label check>
                                <Field type="radio" name="gender" value="female" /> Nữ
                                </Label>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Trình độ</label>
                            <Field
                              placeholder="Trình độ học vấn"
                              type="text"
                              name="level"
                              className="form-control"
                            />
                            <ErrorMessage
                              component="div"
                              name="level"
                              className="error-text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Thành phố</label>
                            <Field
                              placeholder="Thành phố"
                              type="text"
                              className="form-control"
                              name="city"
                            />
                            <ErrorMessage
                              component="div"
                              name="city"
                              className="error-text" />
                          </FormGroup>
                        </Col>
                        <Col md="8">
                          <FormGroup>
                            <label>Địa chỉ</label>
                            <Field
                              placeholder="Địa chỉ"
                              type="text"
                              className="form-control"
                              name="address"
                            />
                            <ErrorMessage
                              component="div"
                              name="address"
                              className="error-text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Textarea
                              name="description"
                              className="form-control"
                              label="Thông tin chi tiết"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                          >
                            Cập nhật thông tin
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Spin>
        <Modal
          isOpen={modal}
          innerRef={modalRef}
        >
          <Formik
            initialValues={{
              username: '',
              password: '',
              email: '',
              id: '',
              roles: ''
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={infoModalSchema}
            innerRef={formInfoRef}
            onSubmit={onHandleUpdateUserInfo}
          >
            <Form id="formUpdateUser">
              <ModalHeader>
                Cập nhật tài khoản
          </ModalHeader>
              <ModalBody>

                <FormGroup>
                  <label>Tên tài khoản</label>
                  <Field
                    placeholder="Tên tài khoản"
                    type="text"
                    name="username"
                    className="form-control"
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <label>Mật khẩu</label>
                  <Field
                    placeholder="Mật khẩu"
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="error-text" />
                </FormGroup>
                <FormGroup>
                  <label>Email </label>
                  <Field
                    placeholder="Email"
                    type="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="error-text" />
                </FormGroup>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">Cập nhật</Button>{' '}
                <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Formik>
        </Modal>
      </div>
    </>
  );
}

export default User;
