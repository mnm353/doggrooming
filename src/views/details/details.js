import React, { Component } from "react"
import axios from "axios"
import "./details.css"
import { connect } from "react-redux"
import * as Actions from "../../redux/action_creaters/action_creator"

class Details extends Component {
	state = {
		product: {}
	}
	// http://localhost:8065/api/products/2
	componentDidMount() {
		axios
			.get(`/api/products/${this.props.match.params.id}`)
			.then(({ data }) => {
				if (data.success) {
					this.setState({
						product: data.product
					})
				} else if (!data.isLoggedIn) {
					this.props.history.push("/")
				} else {
					alert("something blew up")
				}
			})
	}

	render() {
		return (
			<div className='details'>
				<div>
					<img src={this.state.product.image_url} alt='product image' />
					<h1> {this.state.product.name}</h1>
				</div>
				<div>
					<p>{this.state.product.description}</p>
					<h4>{this.state.product.price}</h4>
				</div>
			</div>
		)
	}
}

export default connect(
	null,
	Actions
)(Details)
