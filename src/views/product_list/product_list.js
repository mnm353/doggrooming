import React, { Component } from "react"
import "./product_list.css"
import Header from "../../shared/header/header"
import axios from "axios"
import Product from "./components/product/product"

class ProductList extends Component {
	state = {
		products: []
	}
	// http://localhost:8065/api/products

	componentDidMount() {
		axios.get("/api/products").then(({ data }) => {
			if (data.success) {
				this.setState({
					products: data.products
				})
			} else if (!data.isLoggedIn) {
				this.props.history.push("/")
			} else {
				alert("Something blew up!")
			}
		})
	}
	render() {
		const products = this.state.products.map((e, r) => {
			return (
				<Product
					key={e.id}
					id={e.id}
					name={e.name}
					price={e.price}
					description={e.description}
					image_url={e.image_url}
				/>
			)
		})
		return (
			<div className='product-list'>
				<Header />
				{products}
			</div>
		)
	}
}

export default ProductList
