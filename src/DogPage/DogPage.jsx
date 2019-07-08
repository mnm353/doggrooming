import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { userActions, appointmentActions } from "../_actions"

class DogPage extends React.Component {
	componentDidMount() {
		let user = this.props.user
		var isGroomer = user.IdGroomer !== undefined
		var userID = !isGroomer ? user.IdClient : user.IdGroomer
		this.props.dispatch(appointmentActions.getAllDogs(userID))
	}

	render() {
		const { dogs } = this.props
		return (
			<div className='col-md-6'>
				<h3>All Dogs:</h3>
				{dogs.loading && <em>Loading Dogs...</em>}
				{dogs.error && <span className='text-danger'>ERROR: {dogs.error}</span>}
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>DogName</th>
							<th scope='col'>BirthDate</th>
							<th scope='col'>BreedName</th>
							<th scope='col'>ClientName</th>
						</tr>
					</thead>
					{dogs.items && (
						<tbody>
							{dogs.items.map((dog, index) => (
								<tr>
									<td>{dog.DogName}</td>
									<td>{dog.BirthDate}</td>
									<td>{dog.BreedName}</td>
									<td>{dog.ClientName}</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
				<div>
					<Link to='/'>Back</Link>
					<Link to='/addDog' className='btn btn-link'>
						Add Dog
					</Link>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log("mapStateToProps")
	console.log(state)
	const { dogs, authentication } = state
	const { user } = authentication
	return {
		user,
		dogs
	}
}

const connectedDogPage = connect(mapStateToProps)(DogPage)
export { connectedDogPage as DogPage }
