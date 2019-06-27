import React, { Component } from "react"
import "./login.css"
import axios from "axios"
import { connect } from "react-redux"
import * as actions from "../../redux/action_creaters/action_creator"
import Register from "./subview/register/register"

class Login extends Component {
	state = {
		email: "",
		password: "",
		showRegister: false
	}

	login = () => {
		const loginObj = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post("/api/login", loginObj).then(response => {
			if (response.success) {
				this.props.setUser(response.user)
				this.props.history.push("/products")
			} else {
				alert("Incorrect credentials")
			}
		})
	}
	showRegister = () => {
		this.setState({
			showRegister: true
		})
	}
	render() {
		const register = this.state.showRegister ? <Register /> : ""
		return (
			<div className='login'>
				{register}
				{this.state.showRegister ? (
					""
				) : (
					<div>
						<button onClick={this.login}>login</button>
						<button onClick={this.showRegister}>register</button>
					</div>
				)}
			</div>
		)
	}
}

export default connect(
	state => state,
	actions
)(Login)
