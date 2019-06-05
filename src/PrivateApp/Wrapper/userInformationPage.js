import React from 'react';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/Settings.css';
import SettingsNav from "../Components/Common/SettingsNav";
import UserInformation from "../Components/userInformation";
import ChangePasswordForm from "../Forms/ChangePasswordForm";
import RadioButtonForm from "../Forms/RadioButtonForm";


const UserInformationPage = () => {

    return (
        <div id="app_container">
        <Header hamburger={false}/>
        <div className="account_edit_page_wrapper">
            <SettingsNav/>
            <div className="account_edit_wrapper">
                <div className="account_edit_information_wrapper">
                    <UserInformation/>
                </div>
                <div className="account_edit_form_wrapper">
                    <div className="account_settings_information_frame">
                        <div className="account_settings_information_frame_header">
                            <h4>Paramètre du compte </h4>
                        </div>
                        {/*<EditProfilForm/>
                        <hr/>*/}
                        <ChangePasswordForm/>
                        <div className="private_form_wrapper">
                            <hr/>
                            <h4>Paramètres de notifications</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Newsletter</td>
                                        <td>
                                            <RadioButtonForm/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};



export default UserInformationPage;