import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { appointmentActions } from "../_actions"

class AddAppointmentPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			appointment: {
				idGroomer: "",
				idDog: "",
				startTime: "",
				idGroomingType: "",
				duration: "",
				comments: ""
			},

			submitted: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleGroomerChange = this.handleGroomerChange.bind(this)
		this.handleDogChange = this.handleDogChange.bind(this)
		this.handleTypeChange = this.handleTypeChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const { name, value } = event.target
		const { appointment } = this.state
		this.setState({
			appointment: {
				...appointment,
				[name]: value
			}
		})
	}

	handleGroomerChange(event) {
		const { appointment } = this.state
		this.setState({
			appointment: {
				...appointment,
				idGroomer: event.target.value
			}
		})
	}

	handleDogChange(event) {
		const { appointment } = this.state
		this.setState({
			appointment: {
				...appointment,
				idDog: event.target.value
			}
		})
	}

	handleTypeChange(event) {
		const { appointment } = this.state
		this.setState({
			appointment: {
				...appointment,
				idGroomingType: event.target.value
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		this.setState({ submitted: true })
		const { appointment } = this.state
		const { dispatch } = this.props
		dispatch(appointmentActions.addAppointment(appointment))
	}

	render() {
		const { breeds, dogs, groomingTypes, users } = this.props
		const { appointment, submitted } = this.state
		return (
			<div className='col-md-6 col-md-offset-3'>
				<h2>Add Appointment</h2>
				<form name='form' onSubmit={this.handleSubmit}>
					<div
						className={
							"form-group" +
							(submitted && !appointment.idGroomer ? " has-error" : "")
						}>
						<label>
							Pick your favorite Groomer:
							<select
								value={appointment.idGroomer}
								onChange={this.handleGroomerChange}>
								<option value='' />
								{users.loading && <option value=''>Loading Groomer...</option>}
								{users.error && (
									<span className='text-danger'>ERROR: {users.error}</span>
								)}
								{users.items &&
									users.items.map((groomer, index) => (
										<option value={groomer.IdGroomer}>
											{groomer.FirstName + " " + groomer.Surname}
										</option>
									))}
							</select>
						</label>
						{submitted && !appointment.idGroomer && (
							<div className='help-block'>Groomer is required</div>
						)}
					</div>
					<div
						className={
							"form-group" +
							(submitted && !appointment.idDog ? " has-error" : "")
						}>
						<label>
							Pick your Dog:
							<select value={appointment.idDog} onChange={this.handleDogChange}>
								<option value='' />
								{dogs.loading && <option value=''>Loading Dog...</option>}
								{dogs.error && (
									<span className='text-danger'>ERROR: {dogs.error}</span>
								)}
								{dogs.items &&
									dogs.items.map((dog, index) => (
										<option value={dog.IdDog}>
											{dog.DogName + "-" + dog.BreedName}
										</option>
									))}
							</select>
						</label>
						{submitted && !appointment.IdDog && (
							<div className='help-block'>Dog is required</div>
						)}
					</div>
					<div
						className={
							"form-group" +
							(submitted && !appointment.idGroomingType ? " has-error" : "")
						}>
						<label>
							Pick your Grooming Type:
							<select
								value={appointment.idGroomingType}
								onChange={this.handleTypeChange}>
								<option value='' />
								{groomingTypes.loading && (
									<option value=''>Loading Type...</option>
								)}
								{groomingTypes.error && (
									<span className='text-danger'>
										ERROR: {groomingTypes.error}
									</span>
								)}
								{groomingTypes.items &&
									groomingTypes.items.map((dog, index) => (
										<option value={dog.IdGroomerType}>{dog.Name}</option>
									))}
							</select>
						</label>
						{submitted && !appointment.IdDog && (
							<div className='help-block'>Dog is required</div>
						)}
					</div>
					<div
						className={
							"form-group" +
							(submitted && !appointment.startTime ? " has-error" : "")
						}>
						<label htmlFor='startTime'>Start Time</label>
						<input
							type='text'
							className='form-control'
							name='startTime'
							value={appointment.startTime}
							onChange={this.handleChange}
						/>
						{submitted && !appointment.startTime && (
							<div className='help-block'>Start time is required</div>
						)}
					</div>
					<div className={"form-group"}>
						<label htmlFor='duration'>Duration</label>
						<input
							type='text'
							className='form-control'
							name='duration'
							value={appointment.duration}
							onChange={this.handleChange}
						/>
					</div>
					<div className={"form-group"}>
						<label htmlFor='comments'>Comments</label>
						<input
							type='text'
							className='form-control'
							name='comments'
							value={appointment.comments}
							onChange={this.handleChange}
						/>
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
	const { breeds, dogs, groomingTypes, users } = state
	return {
		breeds,
		dogs,
		groomingTypes,
		users
	}
}

const connectedAddAppointmentPage = connect(mapStateToProps)(AddAppointmentPage)
export { connectedAddAppointmentPage as AddAppointmentPage }
