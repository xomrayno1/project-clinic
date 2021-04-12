import React from 'react';
import { useSelector } from 'react-redux';
import DoctorUser from './Profile/DoctorUser'
import PatientUser from './Profile/PatientUser'
import {Spin} from 'antd';

function UserPage(props) {
    
    const {roles} = useSelector(state => state.auth.user) ;
    console.log(roles) ///fix chô nay
    if(roles[0].authority === 'ROLE_DOCTOR'){
        console.log("ROLE_DOCTOR")
        return (
            <DoctorUser/>
        );
    }else{
        console.log("role_patient")
        return (
            <PatientUser/>
        );
    }
     
}

export default UserPage;