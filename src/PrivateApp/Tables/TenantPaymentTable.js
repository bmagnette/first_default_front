import ReactTable from "react-table";
import React from "react";
import {Link} from "react-router-dom";

class TenantPaymentTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            paymentList: this.props.data
        };
    }

    render(){
        let columns;
        let newList = [];
        let paymentList = this.state.paymentList;
        if(paymentList.length === 0 ){
            columns = [{Header: 'Il n\'y a aucun locataire pour le moment', accessor: 'message'}];
            let tempDict = {"message": "Veuillez ajouter des locataires"};
            newList = this.state.paymentList.push(tempDict);
        }
        else{
            let newList = [];
            columns = [{Header: 'Date de payement', accessor: 'date'}, {Header: 'Type de payement', accessor: 'payment_type'}, {Header: 'Etat', accessor: 'state'}, {Header: "Quittance de loyer", accessor: 'file'}];

            for (let i = 0; i < paymentList.length; i++) {
                let tempDict = {"date": paymentList[i]["payment_date"], "payment_type": paymentList[i]["payment_type"],
                    "state":  paymentList[i]["payment_state"],
                    "file":  <Link to={"#"}><i className="glyphicon glyphicon-download"></i></Link>};
                newList.push(tempDict);
            }
        }
    return(
        <ReactTable data={newList} columns={columns} showPagination={false} minRows={5} filterable={false}
                    sortable={false} resizable={false}/>
    )
}
}

export default TenantPaymentTable;