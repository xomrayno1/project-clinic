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
import {useDispatch,useSelector} from 'react-redux'

import ScheduleSearch from './ScheduleSearch';
import ScheduleTable from './ScheduleTable';
import {fetchSchedule} from '../../redux/action/scheduleAction'

function ScheduleList(props) {
    const dispatch = useDispatch();
    const { schedules, isLoading } = useSelector(state => state.schedule);
    const [filter, setFilter] = useState({
        keySearch: '',
        limit: 5,
        page: 1,
        dateTo: '',
        dateFrom: ''
    })
 
    const { data, pagination } = schedules;

    useEffect(() => {
        dispatch(fetchSchedule(filter))
    }, [filter])

    function handleChangePage(page) {
        setFilter({
            ...filter,
            page
        })
    }
    function handleSearch(form) {
        setFilter({
            ...filter,
            page: 1,
            ...form
        })
    }
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Lịch khám</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                              
                                <Col md="12"    >
                                    <ScheduleSearch handleSearch={handleSearch} />
                                </Col>
                            </Row>
                            <ScheduleTable
                                isLoading={isLoading}
                                data={data}
                                pagination={pagination}
                                handleChangePage={handleChangePage}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ScheduleList;