import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { appointmentActions } from "../_actions"

class AddDogPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			dog: {
				idClient: "",
				name: "",
				birthDate: "",
				idBreed: ""
			},

			submitted: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleBreedChange = this.handleBreedChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const { name, value } = event.target
		console.log(name + value)
		const { dog } = this.state
		this.setState({
			dog: {
				...dog,
				[name]: value
			}
		})
	}

	handleBreedChange(event) {
		const { dog } = this.state
		this.setState({
			dog: {
				...dog,
				idBreed: event.target.value
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		this.setState({ submitted: true })
		const { dog } = this.state
		const { dispatch, user } = this.props
		dog.idClient = user.IdClient
		dispatch(appointmentActions.addNewDog(dog))
	}

	render() {
		const { breeds, dogs, groomingTypes } = this.props
		const { dog, submitted } = this.state
		return (
			<div className='col-md-6 col-md-offset-3'>
				<h2>Add Dog</h2>
				<form name='form' onSubmit={this.handleSubmit}>
					<div
						className={
							"form-group" + (submitted && !dog.name ? " has-error" : "")
						}>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							className='form-control'
							name='name'
							value={dog.name}
							onChange={this.handleChange}
						/>
					</div>
					<div
						className={
							"form-group" + (submitted && !dog.birthDate ? " has-error" : "")
						}>
						<label htmlFor='birthDate'>Birth Date</label>
						<input
							type='text'
							className='form-control'
							name='birthDate'
							value={dog.birthDate}
							onChange={this.handleChange}
						/>
					</div>
					<div
						className={
							"form-group" + (submitted && !dog.idBreed ? " has-error" : "")
						}>
						<label>
							Choose Breed:
							<select value={dog.idBreed} onChange={this.handleBreedChange}>
								<option value='' />
								{breeds.loading && <option value=''>Loading Breed...</option>}
								{breeds.error && (
									<span className='text-danger'>ERROR: {dogs.error}</span>
								)}
								{breeds.items &&
									breeds.items.map((breed, index) => (
										<option value={breed.IdBreed}>{breed.Name}</option>
									))}
							</select>
						</label>
						{submitted && !dog.idBreed && (
							<div className='help-block'>Breed is required</div>
						)}
					</div>
					<div className='form-group'>
						<button className='btn btn-primary'>Submit</button>
						<Link to='/' className='btn btn-link'>
							Cancel
						</Link>
					</div>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { breeds, dogs, groomingTypes, authentication } = state
	const { user } = authentication
	return {
		breeds,
		dogs,
		groomingTypes,
		user
	}
}

const connectedAddDogPage = connect(mapStateToProps)(AddDogPage)
export { connectedAddDogPage as AddDogPage }
