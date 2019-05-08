import React from "react";
import {Redirect, Route} from "react-router-dom";


class AdminRoute extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            loading: true,
        }
    }

    render(){
        const { component: Component, ...rest } = this.props;
        console.log(JSON.parse(localStorage.getItem('USER'))["isAdmin"]);
        return(
            <Route {...rest} render={props => (
                JSON.parse(localStorage.getItem('USER'))["isAdmin"] === 1 ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/signin',
                        state: { from: props.location}
                    }}/>
                )
            )}/>
        )
    }
}

export default AdminRoute;