import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody

} from 'reactstrap'
import { fetchResult } from '../../redux/action/resultAction'
import ResultSearch from './ResultSearch';
import ResultTable from './ResultTable';

function ResultList(props) {

    const {isLoading, results } = useSelector(state => state.result);
    const {data, pagination } = results;
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        searchKey: '',
        limit : 5,
        page : 1,
        dateTo : '',
        dateFrom : ''
    })
 
    useEffect(()=>{
        dispatch(fetchResult(filter))
    },[filter])

     
    function handleChangePage(page){
        setFilter({
            ...filter,
            page
        })
    }
    function handleSearch(searchKey){
        setFilter({
            ...filter,
            page : 1,
            ...searchKey
        })
    }
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Kết quả khám</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="12"    >
                                    <ResultSearch   handleSearch={handleSearch}/>
                                </Col>
                            </Row>
                            <ResultTable
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

export default ResultList;