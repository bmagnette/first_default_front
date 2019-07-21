import React from 'react';
import '../../public/css/PrivateApp/Streamer.css';
import ReactTable from "react-table";
import {BACK_URL} from "../../constants";

class InvoiceTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            redirectToNewPage: false,
            redirectUrl: '',
            payment_data: []};
    }

    componentDidMount(){
        fetch(BACK_URL + 'user/payments', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')},
        })
            .catch(error => {
                this._addNotification(error["error"], "error");
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this.setState({payment_data: response.data})
            })
    };

    render(){
        const payment_data = this.state.payment_data;
        let res = [];
        if(payment_data.length !== 0){
            Object.keys(payment_data).forEach(function(key) {
                let cur_res = {
                    payment_state: payment_data[key]["payment_state"],
                    payment_date: payment_data[key]["payment_date"],
                    payment_role: payment_data[key]["payment_role"],
                    payment_duration: payment_data[key]["payment_duration"],
                    payment_download_url: <span className="glyphicon glyphicon-file">{payment_data[key]["payment_download_url"]}</span>,
                    payment_amount: payment_data[key]["payment_amount"]
                };
                res.push(cur_res);
            });
        }
        else{
            res.push({
                payment_state: "Test",
                payment_date: "Test",
                payment_role: "Test",
                payment_duration: "Test",
                payment_download_url: "Test",
                payment_amount: "Test",
            })
        }


        const columns1 = [{
            Header: 'Date',
            accessor: 'payment_date'
        }, {
            Header: 'Etat',
            accessor: 'payment_state',
        }, {
            Header: 'Payment',
            accessor: 'payment_amount'
        }, {
            Header: 'Rôle',
            accessor: 'payment_role'
        }, {
            Header: 'Durée (jours)',
            accessor: 'payment_duration'
        }, {
            Header: 'Facture',
            accessor: 'payment_download_url'
        }];

        return (
            <div className="invoice_table">
                <ReactTable data={res} columns={columns1} showPagination={false} minRows={0} filterable={false}
                            sortable={false} resizable={false}/>
            </div>
        )
    }
}

export default InvoiceTable