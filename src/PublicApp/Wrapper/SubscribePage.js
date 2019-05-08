import React from 'react';
import Header from "../Components/Common/Header";
import SusbcribeForm from "../Forms/SusbcribeForm";

const SubscribePage = () => (
    <div>
        <Header isScrolling={false} isIndex={true} LogoRedirection="/"/>
        <SusbcribeForm/>
    </div>
);

export default  SubscribePage;