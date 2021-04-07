import React,{useState,useEffect} from 'react';

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

import UserSearch from './UserSearch'
import UserTable from './UserTable'
import UserModal from './UserModal'


import { useDispatch, useSelector} from 'react-redux'
import {
    fetchUser
} from '../../redux/action/userAction';

function UserList(props) {
    const dispatch = useDispatch();
    const {users,isLoading} = useSelector(state => state.user);
    const [filter, setFilter] = useState({
        search: '',
        limit : 5,
        page : 1
    })

    useEffect(()=>{
        dispatch(fetchUser(filter))
    },[filter])

    const {data, pagination} = users 


    function handleChangePage(page){
        setFilter({
            ...filter,
            page
        })
    }
    function handleSearch(search){
        setFilter({
            ...filter,
            page : 1,
            search
        })
    }
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Danh sách tài khoản </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        {/* <Button color="success" onClick={onHandleAddClick}>Thêm</Button> */}
                                    </Col>
                                    <Col md="6"  >
                                        <UserSearch handleSearch={handleSearch} />
                                    </Col>
                                </Row>
                                <UserTable
                                    isLoading={isLoading}
                                    data={data}
                                    pagination={pagination}
                                    handleChangePage={handleChangePage}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <UserModal />
            </div>
        </>
    );
}

export default UserList;