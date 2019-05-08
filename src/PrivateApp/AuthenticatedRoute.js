import React from "react";
import {BACK_URL} from "../constants/index";
import {Redirect, Route} from "react-router-dom";

class AuthenticatedRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            isAuthenticated: false
        }
    }

    componentDidMount(){
        fetch(BACK_URL + 'auth/connexion/authorization_view', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')
            },
        })
            .then(response => {
                if (response.status === 200){
                    return response.json()
                }})
            .then(response_data =>
            {
                this.setState({
                    loading: false,
                    isLogged: response_data["message"]
                })
            });
    }

    render(){
        const { component: Component, ...rest } = this.props;

        return(
            <Route {...rest} render={props => (
                this.state.isLogged === true ? (
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

export default AuthenticatedRoute;