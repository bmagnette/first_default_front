import React from 'react';
import {BACK_URL} from "../constants";
import ReactTable from "react-table";
import '../public/css/PrivateApp/Streamer.css';
import Header from "../PublicApp/Components/Common/Header";
import '../public/css/AdminApp/admin.css';

class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_size: 0,
            last_24h_login: 0,
            last_7days_login: 0,
            users_data: []}
    }
    componentDidMount(){
        fetch(BACK_URL + 'admin/info', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')}})
            .catch(error => {
                console.log(error);
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this.setState({
                    user_size: response["data"]["USER"]["user_size"],
                    last_24h_login: response["data"]["USER"]["last_24h"],
                    last_7days_login: response["data"]["USER"]["last_7days"],
                    users_data: response["data"]["USER"]["user_data"]});
            });
    }
    render(){
        const user_size = this.state.user_size;
        const last_24h_login = this.state.last_24h_login;
        const last_7days_login = this.state.last_7days_login;
        const users_data = this.state.users_data;

        const users_data_columns = [{
            Header: 'last_name',
            accessor: 'last_name'
        }, {
            Header: 'first_name',
            accessor: 'first_name',
        }, {
            Header: 'created_date',
            accessor: 'created_date'
        }, {
            Header: 'last_login',
            accessor: 'last_login'
        }];

        let res = [];
        Object.keys(users_data).forEach(function(key) {
            let cur_res = {
                first_name: users_data[key]["first_name"],
                last_name: users_data[key]["last_name"],
                created_date: users_data[key]["created_date"],
                last_login: users_data[key]["last_login"]
            };

            res.push(cur_res);
        });

        return(
            <div>
                <Header isScrolling={false} isIndex={false} LogoRedirection="/admin"/>
                <div className="admin_wrapper">
                    <div className="admin_stats_wrapper">
                        <ul>
                            <li>Nombre de visiteurs unique: </li>
                            <li>Nombre total de membres : {user_size}</li>
                            <li>Connexion les dernières 24h : {last_24h_login}</li>
                            <li>Connexion les 7 derniers jours : {last_7days_login}</li>
                        </ul>
                    </div>

                    <div className="admin_table_wrapper">
                        <h4>Liste des utilisateurs</h4>
                        <ReactTable data={res} columns={users_data_columns} showPagination={true} minRows={1} filterable={false} sortable={false} resizable={false}/>
                    </div>

                    <div className="admin_todo_wrapper">
                        <p>To do</p>
                        <ul>
                            <li>Monitorer l'activité</li>
                        </ul>
                    </div>
                </div>
            </div>
        )}
}

export default AdminPage;