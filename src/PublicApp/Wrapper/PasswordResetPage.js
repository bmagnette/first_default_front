import React from 'react';
import Header from "../Components/Common/Header";
import PasswordRequestForm from "../Forms/PasswordRequestForm";

const PasswordResetPage = () => (
    <div>
        <Header isScrolling={false} isIndex={true} LogoRedirection="/"/>
        <PasswordRequestForm/>
    </div>
);

export default PasswordResetPage;