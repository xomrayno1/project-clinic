import React from 'react';
import { useSelector } from 'react-redux';
import DoctorUser from './Profile/DoctorUser'
import PatientUser from './Profile/PatientUser'
import {Spin} from 'antd';

function UserPage(props) {
    
    const {roles} = useSelector(state => state.auth.user) ;
     
    if(roles[0].authority === 'ROLE_DOCTOR'){
        
        return (
            <DoctorUser/>
        );
    }else{
         
        return (
            <PatientUser/>
        );
    }
     
}

export default UserPage;