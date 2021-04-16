import React, { useEffect } from 'react';
import NotificationAlert from "react-notification-alert";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    
    Col,
  } from "reactstrap";
import { Collapse, Space,Button} from 'antd';
import CardFooter from 'reactstrap/lib/CardFooter';
import { useDispatch, useSelector } from 'react-redux';
import {fetchAction,updateSeenAction} from '../../redux/action/notiAction'
import {Spin} from 'antd'

function NotificationList(props) {
    const text = `
            A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
        `;
    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const {isLoading,notifications} = useSelector(state => state.notification) || '';
    const {data } = notifications || '';
    useEffect(()=>{
        dispatch(fetchAction());
    },[]);


    function handleOnChange(item){
        if(item.seen === 2){
            dispatch(updateSeenAction(item.id));
        }
    }
    return (
        <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader><CardTitle>Thông báo</CardTitle></CardHeader>
                <CardBody>
                    <Spin spinning={isLoading}>
                        {
                            data && data.map(item => (
                                <Collapse accordion 
                                    onChange={()=>handleOnChange(item)}
                                >
                                    <Panel header={item.title} key="1" bordered 
                                        style={{
                                            fontWeight: item.seen === 2 ? "bold" : ''
                                        }} 
                                    > 
                                        <Card>
                                            <CardHeader>
                                                <Row>
                                                    <Col md="6">
                                                        <CardTitle>Người gửi : {item.sender}</CardTitle>
                                                    </Col>
                                                    <Col md="6">
                                                        <CardTitle>Ngày gửi : {item.date}</CardTitle>
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                <p>{item.message}</p>
                                            </CardBody>
                                            <CardFooter>
                                            {
                                                item && item.type == 2 && (
                                                    <Row  >
                                                        <Col md="12">
                                                            <div className="text-right">
                                                                <Space>
                                                                    <Button type="primary">Đồng ý</Button>
                                                                    <Button>Từ chối</Button>
                                                                </Space>     
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                           
                                            </CardFooter>
                                        </Card>
                                    </Panel>
                                </Collapse>
                            ))
                        }
                    </Spin>  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}

export default NotificationList;