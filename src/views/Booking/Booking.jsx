import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardImg,
    Row,
    Col,
    Button
  } from "reactstrap";
import { List, Avatar } from 'antd';
import {Link} from 'react-router-dom'

function Booking(props) {
   

        const data = [
            {
                id : 1,
                title: 'Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng',
                description : 'Da liễu',
            },
            {
                id : 2,
                title: 'Giáo sư, Tiến sĩ Đào Văn Long',
                description : 'Tiêu hóa - Bệnh viêm gan'
            },
            {
                id : 3,
                title: 'Giáo sư, Tiến sĩ Hà Văn Quyết',
                description : 'Tiêu hóa'
            },
            {
                id : 4,
                title: 'Bác sĩ Chuyên khoa II Nguyễn Quang Cừ',
                description : 'Nam học'
            },
        ];
    return (
        
        <>
            
             <div className="content">
                <Row>
                    <Col md="12">
                    <Card>
                        <CardHeader>
                            <input type="text" className="form-control" placeholder="Nhập bác sĩ cần tìm kiếm..."/>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="12" >
                                <List
                                        split={true}
                                        size="large "
                                        bordered={true}
                                        itemLayout="horizontal"
                                        dataSource={data}
                                        renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<Link to={`/admin/booking/${item.id}`}>{item.title}</Link>}
                                            description={item.description}
                                            />
                                        </List.Item>
                                        )}
                                    />   
                                </Col>
                            </Row>
                            
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            
           
          
             </div>
        </>
    );
}

export default Booking; 