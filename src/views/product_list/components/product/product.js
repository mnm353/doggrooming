import React from "react"
import { Link } from "react-router-dom"
export default function product(props) {
	return (
		<div>
			<Link to={`/details/${props.id}`}>
				<h1>
					{props.name} <sup>{props.price}</sup>
				</h1>
				<p>{props.description}</p>
				<img src={props.image_url} alt='Product Image' />
			</Link>
		</div>
	)
}
