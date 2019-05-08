import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';


const DashboardPage = () => {
    return (
        <div id="app_container">
            <Header />
            <div id="content_wrapper">
                <Nav />
            </div>
        </div>
    )

};

export default DashboardPage;