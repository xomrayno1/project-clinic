import React, {useEffect, useState} from 'react';
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
import { useDispatch,useSelector } from 'react-redux';
import _ from 'lodash'
import user from 'user.svg'

import {fetchDoctor} from '../../redux/action/doctorAction';

function Booking(props) {
    const [filter, setFilter] = useState({
        limit : 1000,
        page : 1,
        search : ''
    });
    const {data} = useSelector(state => state.doctor.doctors);
    const dispatch = useDispatch();
    useEffect(()=>{
         dispatch(fetchDoctor(filter));
    },[filter])

    function debounceEventHandler(...args) {
        const debounced = _.debounce(...args)
        return function(e) {
          e.persist()
          return debounced(e)
        }
      }
    function handleOnSearch(e){
        setFilter({
            ...filter,
            search : e.target.value
        })
    }
    return (
        <>
             <div className="content">
                <Row>
                    <Col md="12">
                    <Card>
                        <CardHeader>
                            <input type="text" className="form-control"
                                placeholder="Nhập bác sĩ cần tìm kiếm..."
                                onChange={debounceEventHandler(handleOnSearch, 500)}
                                name="search"
                             />
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                   <p style={{ fontSize: '16px', 
                                            fontWeight: 'bold',
                                             marginBottom: '4px'}}> Bác sĩ nổi bậc</p>
                                </Col>
                            </Row>
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
                                            avatar={<Avatar src={item.imageUrl !== null ?   `http://localhost:8080/${item.imageUrl}`   : user} />}
                                            title={<Link to={`/admin/booking/${item.id}`}>{item.name}</Link>}
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