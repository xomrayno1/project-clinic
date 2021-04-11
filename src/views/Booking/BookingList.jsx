import React,{useEffect, useState} from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    CardTitle,
     
} from "reactstrap";
import {
    Table,
    Space,
    Popconfirm,
    Tag,
    DatePicker,
    Select,
    Button
} 
from 'antd';
import { useDispatch, useSelector } from 'react-redux';
function BookingList(props) {
    const { RangePicker } = DatePicker;
    const {Option} = Select;
    const dispatch = useDispatch();
    //const state  = useSelector(state => state.);
    const [date, setDate]  = useState({
        dateTo : '',
        dateFrom : ''
    })
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(0);
    const [filter, setFilter] = useState({
        page : 1, 
        limit: 5,
        search: '',
        status: 0,
        dateTo: '',
        dateFrom: ''
    });

    function onChange(date,dateString){
        dateString && setDate({
            // dateTo: `${dateString[0]} 00:00:00`,
            // dateFrom: `${dateString[1]} 23:59:00`,
            dateTo : dateString[0],
            dateFrom : dateString[1],
        })
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên bác sĩ',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
        }
        ,{
            title: 'Tên bệnh nhân',
            dataIndex: 'patient_name',
            key: 'patient_name',
        },{
            title: 'Thời gian khám',
            dataIndex: 'schedule_time',
            key: 'schedule_time',
        }
        ,{
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render : item => {
                const color = item === '1' ? 'green' : 'geekblue';
                const display = item === '1' ? 'Khám lần đầu' : 'Tái khám' 
                return (
                    <Tag color={color}> 
                        {display}
                    </Tag>
                )
            }
        }
        ,{
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render : item => {
                const color = item === '1' ? 'geekblue' : 'green';
                const display = item === '1' ? 'Đang đợi' : 'Đã hoàn thành' 
                return (
                    <Tag color={color}> 
                        {display}
                    </Tag>
                )
            }
        },{
            title : '+',
            dataIndex: 'action',
            align : 'center',
            render: (_,item)=>(
                <Space>
                    <Button key={1} color="primary" onClick={()=> onHandleView(item)} >Xem</Button>
                     
                    <Popconfirm title="Bạn có chắc muốn huỷ lịch" 
                        onConfirm={ () => onHandleCancel(item)}>
                        <Button key={3} color="danger">Huỷ lịch</Button> 
                    </Popconfirm>
                </Space>
            )
        },
    ]
    useEffect(()=>{
         
    },[filter])

    function onChangeStatus(value){
        setStatus(value)
    }
    function onHandleCancel(item){

    }
    function onHandleView(item){

    }
    function handleSubmitSearch(){
        setFilter({
            ...filter,
            ...date,
            searchKey : search,
            status,
        })
        const form = {
            ...date,
            searchKey : search,
            status,
        }
        console.log(form);
    }

    return (
        <>
             <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                            <CardTitle tag="h4">Lịch khám của bạn</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                <Col col="4">
                                    <RangePicker 
                                        onChange={onChange} 
                                        style={{
                                            width: '250px'
                                        }}
                                    />
                                </Col>
                                <Col col="2" >
                                    <Select placeholder="Tình trạng"
                                        onChange={onChangeStatus}
                                        style={{
                                            width: '150px',
                                            textAlign : 'center'
                                        }}>
                                        <Option value="0">Tất cả</Option>
                                        <Option value="1">Đang đợi</Option>
                                        <Option value="2">Đã hoàn thành</Option>
                                        <Option value="3">Đã huỷ</Option>
                                    </Select>
                                </Col>
                                <Col col="2">
                                    <input  type="text" 
                                        placeholder="Nhập tìm kiếm..." 
                                        className="form-control"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </Col>
                                <Col col="2">
                                    <Button type="primary" onClick={handleSubmitSearch}>Tìm kiếm</Button>
                                </Col>
                                </Row>
                                <Row>
                                    <Col md="12"    >
                                        <Table  
                                            bordered={true}
                                            columns={columns}/>
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

export default BookingList;