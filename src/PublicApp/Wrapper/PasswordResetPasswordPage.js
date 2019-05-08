import React from 'react';
import Header from "../Components/Common/Header";
import ResettingPasswordForm from "../Forms/ResettingPasswordForm";

const PasswordResetPasswordPage = () => (
    <div>
        <Header isScrolling={false} isIndex={true} LogoRedirection="/"/>
        <ResettingPasswordForm/>
    </div>
);

export default PasswordResetPasswordPage;