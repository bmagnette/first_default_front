import React from 'react';

import Header from "../Components/Common/Header";
import SignInForm from "../Forms/SignInForm";

const SignInPage = () => (
    <div>
        <Header isScrolling={false} isIndex={true} LogoRedirection="/"/>

        <SignInForm/>
    </div>
);

export default SignInPage;