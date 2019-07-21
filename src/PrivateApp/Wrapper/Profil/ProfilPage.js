import React from 'react';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/Settings.css';
import SettingsNav from "../../Components/Common/SettingsNav";
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis,} from 'recharts';


const ProfilPage = () => {
    const data = [
        {
            subject: 'Diversification', A: 50, B: 40, fullMark: 100,
        },
        {
            subject: 'Liquidité annuel', A: 98, B: 130, fullMark: 150,
        },
        {
            subject: 'Immobilier', A: 86, B: 130, fullMark: 150,
        },
        {
            subject: 'Bourse', A: 99, B: 100, fullMark: 150,
        },
        {
            subject: 'Frais', A: 85, B: 90, fullMark: 150,
        }
    ];
    return (
        <div id="app_container">
            <Header hamburger={false}/>
            <div className="account_edit_page_wrapper">
                <SettingsNav/>
                <div>
                    <h4>Objectif VS Actuel</h4>
                    <RadarChart cx={150} cy={150} outerRadius={150} width={400} height={325} data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar name="Objectif" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
                        <Radar name="Actuel" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
                        <Legend />
                    </RadarChart>
                </div>
            </div>
        </div>
    )
};



export default ProfilPage;