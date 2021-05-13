
import React, {useCallback, useEffect, useState} from "react";
// react plugin used to create charts
import { Line, Pie, Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {getStatistical, getChartSchedule} from '../redux/action/dashboardAction'
 
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  getChartData
} from "variables/charts.js";
import dashboardApi from "api/dashboardApi";
import { Spin } from "antd";
import ChartSchedule from "./ChartSchedule";
 

function Dashboard(props) {
  
  const [updateStatistical, setUpdateStatistical] = useState(false);
  const [statistical, setStatistical] = useState({
    count_patient : '',
    count_patient: '',
    count_schdule_waiting:'',
    count_schdule_waiting: ''
  });
  const [isLoading,setIsLoading] = useState(false);
  
  useEffect(()=>{
    setIsLoading(true)
    async function fetchStatistical(){
      const response = await dashboardApi.statistical();
      setStatistical(response);
      setIsLoading(false);
    }
    fetchStatistical()
  },[updateStatistical])

  function onUpdateNow(){
    setUpdateStatistical(!updateStatistical)
  }
  const dispatch = useDispatch();
  const {chart} = useSelector(state => state.statistical) || [];

  useEffect(()=>{
    dispatch(getChartSchedule());
  },[]);
 
  

  const chartDataSchedule = useCallback(()=>getChartData(chart),[chart]);
  // const chartDataSchedule = ()=> {
  //   console.log("chart -redender");
  //   return getChartData(chart);
  // }
  return (
    <>
      <div className="content">
       <Spin  spinning={isLoading}  >
       <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Số bác sĩ</p>
                      <CardTitle tag="p">{statistical.count_doctor}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" onClick={onUpdateNow} /> Update Now
                  </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Số bệnh nhân</p>
                      <CardTitle tag="p">{statistical.count_patient}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                  </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Lịch đang chờ</p>
                      <CardTitle tag="p">{statistical.count_schdule_waiting}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                  </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Lịch hoàn thành</p>
                      <CardTitle tag="p">{statistical.count_schdule_success}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" onClick={onUpdateNow}/> Update now
                  </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
       </Spin>
        <Row>
          <ChartSchedule  chartData={chartDataSchedule}  />
        </Row>
        {/* <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> */}
      </div>
    </>
  );
}

 
export default Dashboard;
