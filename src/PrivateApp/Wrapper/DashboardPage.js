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
    let currentTenant = user["current_tenants"];
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

    let dataTenants = [];
    for (let i = 0; i < currentTenant.length; i++) {
        let tempDict = {"nom": currentTenant[i]["last_name"], "prenom": currentTenant[i]["first_name"], "mobile":  currentTenant[i]["mobile"],
        "finContrat":  currentTenant[i]["contract_end"]};
        dataTenants.push(tempDict);
    }

    if(currentTenant.length === 0 ){
        let tempDict = {"nom": "Veuillez ajouter des locataires", "prenom": "", "mobile":  "",
            "finContrat":  ""};
        dataTenants.push(tempDict);
    }

    const columns = [{Header: 'Nom', accessor: 'nom'}, {Header: 'Prénom', accessor: 'prenom'}, {Header: 'Téléphone', accessor: 'mobile'}, {Header: "Fin de contrat", accessor: 'finContrat'}];

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
                            data={dataTenants}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;