import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/card.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Streamer from './Streamer';
import 'react-table/react-table.css';
import TenantTable from "../../Tables/TenantTable";

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

    const user = JSON.parse(localStorage.getItem('USER'));

    return (
        <div id="app_container">

            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <Streamer title={""} values={user["global_info"]}/>
                    <div>
                        <div className="dashboard_wrapper">
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
                            <div className="event_table_wrapper">
                                <table className="event_table">
                                    <tr>
                                        <th>Evènements</th>
                                        <th>Date</th>
                                    </tr>
                                    <tr>
                                        <td>Entré de nouveaux locataires</td>
                                        <td>05/09/2019</td>
                                    </tr>
                                    <tr>
                                        <td>Payment de location</td>
                                        <td>05/09/2019</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;