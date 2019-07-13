import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/card.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Streamer from '../Streamer';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const DashboardPage = () => {

    const user = JSON.parse(localStorage.getItem('USER'));
    let stats = user["global_info"];

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
    const data = [{
        name: 'Tanner Linsley',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        }
    }];
    const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
    }, {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
    }, {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
    }];

    return (
        <div id="app_container">

            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <Streamer values={stats}/>
                    <div>
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
                        <ReactTable
                            data={data}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;