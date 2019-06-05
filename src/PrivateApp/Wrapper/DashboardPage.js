import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/card.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Streamer from '../Streamer';


const DashboardPage = () => {

    const data2 = [
        {
            name: '21/05/2019', actual: 0, estimated: 0,
        },
        {
            name: '22/05/2019', actual: 0, estimated: 0,
        },
        {
            name: '23/05/2019', actual: 0, estimated: 0,
        },
        {
            name: '24/05/2019', actual: 0, estimated: 0,
        },
        {
            name: '25/05/2019', actual: 0, estimated: 0,
        },
        {
            name: '26/05/2019', actual: 0, estimated: 0,
        },
        {
            name: '27/05/2019', actual: 0, estimated: 0,
        },
    ];
    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <Streamer/>
                    <div id="dashboard_graphs">
                        <LineChart width={700} height={300} data={data2}>
                            <Line type="monotone" dataKey="actual" stroke="#8884d8" />
                            <Line type="monotone" dataKey="estimated" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;