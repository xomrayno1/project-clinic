
import React from "react";

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
} from "reactstrap";
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup';
import Textarea from "variables/Textarea";


function User(props) {

    const doctorProfileSchema = Yup.object({
      name : Yup.string().required("Vui lòng nhập tên"),
      email : Yup.string().required("Vui lòng nhập email"),
      phone: Yup.string().required("Vui lòng nhập số điện thoại"),
      gender: Yup.string().required("Vui lòng nhập giới tính"),
      domain: Yup.string().required("Vui lòng nhập chuyên nghành"),
      education: Yup.string().required("Vui lòng nhập  trường tốt nghiệp"),
      level: Yup.string().required("Vui lòng nhập trình độ"),
      address: Yup.string().required("Vui lòng nhập địa chỉ"),
      city: Yup.string().required("Vui lòng nhập thành phố"),
    })
   
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/damir-bosnjak.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/mike.jpg")}
                      />
                      <h5 className="title">Chet Faker</h5>
                    </a>
                    <p className="description">@chetfaker</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Chỉnh sửa thông tin   </CardTitle>
                </CardHeader>
                <CardBody>
                  <Formik 
                      initialValues={{
                          name : '',
                          email : '',
                          phone: '',
                          gender: 'male',
                          description: '',
                          domain: '',
                          education: '',
                          level: '',
                          address: '',
                          city: ''
                      }}
                      onSubmit={(data)=> console.log(data)}
                      validationSchema={doctorProfileSchema}
                      validateOnBlur={false}
                      validateOnChange={false}
                  > 
                    <Form>
                      <Row>
                        <Col className="pr-1" md="5">
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
                        <Col className="px-1" md="3">
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
                        </Col>
                        <Col className="pl-1" md="4">
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
                                  <Field type="radio"  name="gender" value="female" /> Nữ
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
        </div>
      </>
    );
  }

export default User;
