import React from 'react';
import { useHistory } from 'react-router';
import {Row, Col, CardBody, Card} from 'reactstrap'
import {Button} from 'antd';

function AccessDenied(props) {
    const history = useHistory();
 
    return (
        <div className="App">
            <Row className="text-center">
                <Col md="12">
                   <Card>
                       <CardBody>
                            <h3 >Bạn không được truy cập vào trang này.</h3>
                            <Button type="primary" onClick={() =>  history.goBack()}>Quay lại</Button>
                       </CardBody>
                   </Card>
                </Col>
            </Row>
        </div>
    );
}

export default AccessDenied;