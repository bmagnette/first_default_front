import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from "./PublicApp/Wrapper/IndexPage";
import SubscribePage from "./PublicApp/Wrapper/SubscribePage";
import SignInPage from "./PublicApp/Wrapper/SignInPage";
import PasswordResetPage from "./PublicApp/Wrapper/PasswordResetPage";
import PasswordResetPasswordPage from './PublicApp/Wrapper/PasswordResetPasswordPage'
import CalendarPage from "./PrivateApp/Wrapper/Calendar/CalendarPage";
import UserInformationPage from "./PrivateApp/Wrapper/Profil/userInformationPage";
import AdminPage from "./AdminApp/AdminPage";
import AuthenticatedRoute from "./PrivateApp/AuthenticatedRoute";
import AdminRoute from "./AdminApp/AdminRoute";
import DashboardPage from "./PrivateApp/Wrapper/Dashboard/DashboardPage";
import SimulatorRealEstate from "./PrivateApp/Wrapper/RealEstate/SimulatorRealEstate";
import RealEstatePage from "./PrivateApp/Wrapper/RealEstate/RealEstatePage";
import AddRealEstate from "./PrivateApp/Forms/RealEstate/AddRealEstate";
import ModifyBuilding from "./PrivateApp/Forms/RealEstate/ModifyBuilding";
import ProfilPage from "./PrivateApp/Wrapper/Profil/ProfilPage";
import TenantPage from "./PrivateApp/Wrapper/Tenants/TenantPage";
import ContactPage from "./PrivateApp/Wrapper/ContactPage";
import DocumentPage from "./PrivateApp/Wrapper/DocumentPage";
import SettingOffersPage from "./PrivateApp/Wrapper/SettingOffersPage";
import RealEstateView from "./PrivateApp/Wrapper/RealEstate/RealEstateView";
{/*
import ProductPage from "./PrivateApp/Wrapper/ProductPage";
import PricingPage from "./PublicApp/Wrapper/PricingPage";
import ServicesPage from "./PublicApp/Wrapper/ServicesPage"; */}

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
            <AuthenticatedRoute exact path="/immobilier" component={RealEstatePage}/>
            <AuthenticatedRoute exact path="/immobilier/ajouter" component={AddRealEstate}/>
            <AuthenticatedRoute exact path="/immobilier/modifier" component={ModifyBuilding}/>
            <AuthenticatedRoute exact path="/immobilier/view" component={RealEstateView}/>
            <AuthenticatedRoute exact path="/locataires" component={TenantPage}/>
            <AuthenticatedRoute exact path="/contact" component={ContactPage}/>
            <AuthenticatedRoute exact path="/documents" component={DocumentPage}/>
            <AuthenticatedRoute exact path="/simulation" component={SimulatorRealEstate}/>
            <AuthenticatedRoute exact path="/calendar" component={CalendarPage}/>
            {/*<AuthenticatedRoute exact path="/produits" component={ProductPage}/>*/}

            {/* Profile member */}
            <AuthenticatedRoute exact path="/profil" component={ProfilPage}/>
            <AuthenticatedRoute exact path="/information" component={UserInformationPage}/>
            <AuthenticatedRoute exact path="/invoice" component={SettingOffersPage}/>
            {/*<AuthenticatedRoute exact path="/invoice/:payment_state" component={SettingOffersPage} paymentCheck={true} />*/}

            {/* Admin dashboard */}
            <AdminRoute exact path="/admin" component={AdminPage}/>
        </div>
);

export default RouterExample