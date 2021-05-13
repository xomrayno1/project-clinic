import React, { useEffect } from 'react';
import {   Bar } from "react-chartjs-2";
import {Col, CardBody, CardFooter, CardHeader, CardGroup, Card, CardTitle} from 'reactstrap'
import {
    dashboard24HoursPerformanceChart,getChartData
  } from "variables/charts.js"; 
function ChartSchedule({chartData}) {

    // useEffect(()=>{ //test usecallback co hoat dong ko
    //     console.log("chart re-rendering");
    // },[chartData])
 
    return (
        <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Biểu đồ lịch khám của năm</CardTitle>
            <p className="card-category">24 Hours performance</p>
          </CardHeader>
          <CardBody>
            <Bar data={chartData}
              width={400} height={500}
              options={{ maintainAspectRatio: false }}
            />
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
          </CardFooter>
        </Card>
      </Col>
    );
}

export default React.memo(ChartSchedule);