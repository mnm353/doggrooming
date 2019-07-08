import React, { Component } from "react"
import "./login.css"
import axios from "axios"
import { connect } from "react-redux"
import * as actions from "../../redux/action_creaters/action_creator"
//import Register from "./subview/register/register"
import RegisterPage from "../../RegisterPage/RegisterPage"

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
		axios.post("/api/login", loginObj).then(({ data }) => {
			if (data.success) {
				this.props.setUser(data.user)
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
	register = registerObj => {
		debugger
		axios.post("/api/register", registerObj).then(({ data }) => {
			debugger
			if (data.success) {
				this.props.setUser(data.user)
				this.props.history.push("/products")
			} else {
				alert("Email already exists login.")
			}
		})
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const register = this.state.showRegister ? (
			<RegisterPage RegisterPage={this.RegisterPage} />
		) : (
			""
		)
		return (
			<div className='login'>
				{register}
				{this.state.showRegister ? (
					""
				) : (
					<div>
						<input
							type='text'
							placeholder='Email'
							name='email'
							value={this.state.email}
							onChange={this.handleChange}
						/>
						<input
							type='text'
							placeholder='Password'
							name='password'
							value={this.state.password}
							onChange={this.handleChange}
						/>
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
