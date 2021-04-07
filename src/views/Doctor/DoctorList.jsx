import React, { useEffect, useState } from 'react';
import user from 'user.svg'
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

import {
    Table,
    Space,
    Modal,
    Form,
    Input,
    Popconfirm
} 
from 'antd';
import { Radio } from 'antd';
import { useDispatch, useSelector} from 'react-redux'
import {fetchDoctor, updateDoctor, setStateModal} from '../../redux/action/doctorAction'
import DoctorTable from './DoctorTable';
import DoctorSearch from './DoctorSearch';
import ModalDoctor from './ModalDoctor';
 

function DoctorList(props) {
    
    const dispatch = useDispatch();
    const {doctors,isLoading} = useSelector(state => state.doctor);
    const [filter, setFilter] = useState({
        search: '',
        limit : 5,
        page : 1
    })
    
    const {data, pagination} = doctors;
 
    useEffect(()=>{
        dispatch(fetchDoctor(filter))
    },[filter])

  
    // function handleVisible(result){
    //     setStateModal({
    //         ...stateModal,
    //         visible : result
    //     })
    // }
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
                  <CardTitle tag="h4">Danh sách bác sĩ </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6">
                            {/* <Button color="success" onClick={onHandleAddClick}>Thêm</Button> */}
                        </Col>
                        <Col md="6"  >
                            <DoctorSearch   handleSearch={handleSearch}/>
                        </Col>
                    </Row>
                    <DoctorTable isLoading={isLoading}  
                                // handleVisible={handleVisible} 
                                 data={data} 
                                 pagination={pagination}
                                 handleChangePage={handleChangePage}
                               
                                 />
                </CardBody>
              </Card>
            </Col>
          </Row>
        
            <ModalDoctor   />
          
        </div>
       </>
    );
}

export default DoctorList;