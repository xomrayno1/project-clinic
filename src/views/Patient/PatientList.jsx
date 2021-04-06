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
 
import PatientSearch from './PatientSearch'
import PatientTable from './PatientTable'
import PatientModal from './PatientModal'

import { useDispatch, useSelector} from 'react-redux'
import {
    fetchPatient
} from '../../redux/action/patientAction';
 
function PatientList(props) {
    const dispatch = useDispatch();
    const {patients,isLoading} = useSelector(state => state.patient);

    const [filter, setFilter] = useState({
        search: '',
        limit : 5,
        page : 1
    })
 
    useEffect(()=>{
        dispatch(fetchPatient(filter))
    },[filter])

    const {data, pagination} = patients 
    //|| {data :[], pagination: null};

 
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
                  <CardTitle tag="h4">Danh sách bệnh nhân </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6">
                            {/* <Button color="success" onClick={onHandleAddClick}>Thêm</Button> */}
                        </Col>
                        <Col md="6"  >
                            <PatientSearch   handleSearch={handleSearch}/>
                        </Col>
                    </Row>
                       <PatientTable 
                            isLoading={isLoading}  
                            data={data} 
                            pagination={pagination}
                            handleChangePage={handleChangePage}
                        />
                </CardBody>
              </Card>
            </Col>
          </Row>
        
            <PatientModal   />
          
        </div>
       </>
    );
}

export default PatientList;