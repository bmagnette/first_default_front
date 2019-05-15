import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from "./PublicApp/Wrapper/IndexPage";
import SubscribePage from "./PublicApp/Wrapper/SubscribePage";
import SignInPage from "./PublicApp/Wrapper/SignInPage";
import PasswordResetPage from "./PublicApp/Wrapper/PasswordResetPage";
import PricingPage from "./PublicApp/Wrapper/PricingPage";
import ServicesPage from "./PublicApp/Wrapper/ServicesPage";
import PasswordResetPasswordPage from './PublicApp/Wrapper/PasswordResetPasswordPage'
import DashboardPage from "./PrivateApp/Wrapper/dashboardPage";
import ProfilPage from "./PrivateApp/Wrapper/profilPage";
import AdminPage from "./AdminApp/AdminPage";
import SettingOffersPage from "./PrivateApp/Wrapper/SettingOffersPage";
import AuthenticatedRoute from "./PrivateApp/AuthenticatedRoute";
import AdminRoute from "./AdminApp/AdminRoute";


const RouterExample = () => (
        <div>
            {/* Presentation */}
            <Route exact path="/" component={IndexPage}/>
            {/* <Route exact path="/tarification" component={PricingPage}/>
            <Route exact path="/services" component={ServicesPage}/>*/}

            {/* Public member */}
            <Route exact path="/susbcribe" component={SubscribePage}/>
            <Route exact path="/signin" component={SignInPage}/>
            <Route exact path="/new_password_request" component={PasswordResetPage}/>
            <Route exact path="/reset_password" component={PasswordResetPasswordPage}/>

            {/* Private member */}
            <AuthenticatedRoute exact path="/dashboard" component={DashboardPage}/>

            {/* Profile member */}
            <AuthenticatedRoute exact path="/profil" component={ProfilPage}/>
            {/* <AuthenticatedRoute exact path="/invoice" component={SettingOffersPage}/>
            <AuthenticatedRoute exact path="/invoice/:payment_state" component={SettingOffersPage} paymentCheck={true} />*/}

            {/* Admin dashboard */}
            <AdminRoute exact path="/admin" component={AdminPage}/>
        </div>
);

export default RouterExample