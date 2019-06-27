import React, { Component } from 'react'
import './login.css'
import axios from 'axios';
import {connect} from 'react-redux'
import * as actions from '../../redux/action_creaters/action_creator'

class Login extends Component {
    state = {
        email:'',
        password:''
    }
    
    login = () => {
        const loginObj = {
            email: this.state.email,
            password:this.state.password,
        }
        axios.post('/api/login', loginObj)
        .then((response)=>{
            if(response.success){
                this.props.setUser(response.user);
                this.props.history.push('/products');
            }else{
                alert('Incorrect credentials')
            }
        })
    }
    render() {
        return (
            <div className="login">
                login
            </div>
        )
    }
}

export default connect(state => state, actions)(Login);