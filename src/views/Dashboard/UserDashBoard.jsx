
import Footer from "components/Footer/Footer";
import React, {useEffect, useState} from "react";
 
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function UserDashBoard(props) {
  return (
    <>
      <div className="content">
          <Row>
            <Col md="12">
                <Card>
                    <CardHeader>
                        <h3>Xin chào đã đăng nhập vào hệ thống. </h3>
                    </CardHeader>
                </Card>
            </Col>
          </Row>
      </div>
    </>
  );
}


export default UserDashBoard;
