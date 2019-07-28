import ReactTable from "react-table";
import React from "react";
import { Redirect } from 'react-router-dom'

class TenantTable extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selected: null,
            redirectTenantPage: false
        }
    }

    rowSelection = (state, rowInfo) => {
        if (rowInfo && rowInfo.row) {
            return {
                onClick: (e) => {
                    this.setState({
                        selected: rowInfo.index,
                        redirectTenantPage: true
                    });
                }
            }
        }else{
            return {}
        }
    };

    render(){

        if(this.state.redirectTenantPage){
            return <Redirect to="/locataire/view" />
        }
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
                let tempDict = {"nom": currentTenant[i]["last_name"], "prenom": currentTenant[i]["first_name"], "mobile":  currentTenant[i]["mobile"],
                    "finContrat":  currentTenant[i]["contract_end"]};
                dataTenants.push(tempDict);
            }
            columns = [{Header: 'Nom', accessor: 'nom'}, {Header: 'Prénom', accessor: 'prenom'}, {Header: 'Téléphone', accessor: 'mobile'}, {Header: "Fin de contrat", accessor: 'finContrat'}];
        }

        return(
            <div className="tenant_table_wrapper">
        <ReactTable data={dataTenants} columns={columns} showPagination={false} minRows={0} filterable={false}
                    sortable={false} resizable={false}  getTrProps={this.rowSelection}/>
            </div>
    )
    }
}

export default TenantTable;