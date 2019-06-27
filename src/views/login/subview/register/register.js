import React, { Component } from "react"

export default class register extends Component {
	state = {
		email: "",
		password: "",
		first_name: "",
		last_name: "",
		username: ""
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const inputs = Object.keys(this.state).map((e, i) => {
			return (
				<input
					type='text'
					placeholder={e}
					name={e}
					value={this.state[e]}
					onChange={this.handleChange}
				/>
			)
		})
		return <div>{inputs}</div>
	}
}
