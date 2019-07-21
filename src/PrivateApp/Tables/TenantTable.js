import ReactTable from "react-table";
import React from "react";


const TenantTable = () => {

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
        <ReactTable data={dataTenants} columns={columns} showPagination={false} minRows={0} filterable={false}
                    sortable={false} resizable={false}/>
    )
};

export default TenantTable;