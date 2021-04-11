
import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import {Formik,Form} from 'formik'

function User(props) {
   
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
                          gender: '',
                          description: '',
                          domain: '',
                          education: '',
                          level: '',
                          address: '',
                          city: ''
                      }}
                      onSubmit={(data)=> console.log(data)}
                      
                      
                  > 
                    <Form>
                      <Row>
                        <Col className="pr-1" md="5">
                          <FormGroup>
                            <label>Tên</label>
                            <Input
                              placeholder="Tên"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Email</label>
                            <Input placeholder="Email" type="email" />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Số điện thoại
                            </label>
                            <Input placeholder="Số điện thoại" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Chuyên ngành</label>
                            <Input
                              placeholder="Chuyên ngành"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Tốt nghiệp</label>
                            <Input
                              placeholder="Tốt nghiệp"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                            {/* position: absolute;
    top: 35px;
    left: 100px;
} */}
                        <Col className="pr-1" md="6">
                          <FormGroup check className="text-center ">
 
                             
                              <Label check>
                                  <Input type="radio" /> Nam
                                </Label>
                                <Label check>
                                  <Input type="radio" /> Nữ
                                </Label>
                             
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Trình độ</label>
                            <Input
                              placeholder="Trình độ học vấn"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Thành phố</label>
                            <Input
                              placeholder="Thành phố"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="8">
                          <FormGroup>
                            <label>Địa chỉ</label>
                            <Input
                              placeholder="Địa chỉ"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Thông tin thêm</label>
                            <Input
                              type="textarea"
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
