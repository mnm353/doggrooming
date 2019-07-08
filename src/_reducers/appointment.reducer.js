import { appointmentConstants } from "../_constants"

export function appointments(state = {}, action) {
	switch (action.type) {
		case appointmentConstants.APPOINTMENT_VIEW:
			return {
				loading: true
			}
		case appointmentConstants.APPOINTMENT_VIEW_SECCESS:
			return {
				items: action.appointments
			}
		case appointmentConstants.APPOINTMENT_VIEW_FAILURE:
			return {
				error: action.error
			}
		case appointmentConstants.APPOINTMENT_DELETE:
			// add 'deleting:true' property to user being deleted
			return {
				...state,
				items: state.items.map(function(appointment) {
					console.log(
						appointment.StartTime +
							appointment.DogName +
							"::" +
							action.StartTime +
							action.DogName
					)
					console.log(action)
					return appointment.StartTime + appointment.DogName ===
						action.StartTime + action.DogName
						? { ...appointment, deleting: true }
						: appointment
				})
			}
		case appointmentConstants.APPOINTMENT_DELETE_SUCCESS:
			// remove deleted user from state
			return {
				items: state.items.filter(function(appointment) {
					console.log(
						appointment.StartTime +
							appointment.DogName +
							"::" +
							action.StartTime +
							action.DogName
					)
					return (
						appointment.StartTime + appointment.DogName !==
						action.StartTime + action.DogName
					)
				})
			}
		case appointmentConstants.APPOINTMENT_DELETE_FAILURE:
			// remove 'deleting:true' property and add 'deleteError:[error]' property to user
			return {
				...state,
				items: state.items.map(appointment => {
					if (appointment.id === action.id) {
						// make copy of user without 'deleting:true' property
						const { deleting, ...appointmentCopy } = appointment
						// return copy of user with 'deleteError:[error]' property
						return { ...appointmentCopy, deleteError: action.error }
					}

					return appointment
				})
			}
		default:
			return state
	}
}
