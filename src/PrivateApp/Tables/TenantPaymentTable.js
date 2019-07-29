import ReactTable from "react-table";
import React from "react";
import {Link} from "react-router-dom";

class TenantPaymentTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selected: null};
    }

    render(){

        const user = JSON.parse(localStorage.getItem('USER'));
        let currentTenant = user["current_tenants"];

        let dataTenants = [];
        let columns;

        if(currentTenant.length === 0 ){
            columns = [{Header: 'Il n\'y a aucun locataire pour le moment', accessor: 'message'}];
            let tempDict = {"message": "Veuillez ajouter des locataires"};
            dataTenants.push(tempDict);
        }
        else{
            for (let i = 0; i < currentTenant.length; i++) {
                let tempDict = {"date": currentTenant[i]["payment_date"], "payment_type": currentTenant[i]["payment_type"], "state":  currentTenant[i]["payment_state"],
                    "file":  <Link to={"#"}><i className="glyphicon glyphicon-download"></i></Link>};
                dataTenants.push(tempDict);
            }
            columns = [{Header: 'Date de payement', accessor: 'date'}, {Header: 'Type de payement', accessor: 'payment_type'}, {Header: 'Etat', accessor: 'state'}, {Header: "Quittance de loyer", accessor: 'file'}];
        }
    return(
        <ReactTable data={dataTenants} columns={columns} showPagination={false} minRows={0} filterable={false}
                    sortable={false} resizable={false}/>
    )
}
}

export default TenantPaymentTable;