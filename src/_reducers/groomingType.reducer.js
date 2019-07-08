import { appointmentConstants } from "../_constants"

export function groomingTypes(state = {}, action) {
	switch (action.type) {
		case appointmentConstants.GROOMING_TYPE_VIEW:
			return {
				loading: true
			}
		case appointmentConstants.GROOMING_TYPE_VIEW_SECCESS:
			return {
				items: action.groomingTypes
			}
		case appointmentConstants.GROOMING_TYPE_VIEW_FAILURE:
			return {
				error: action.error
			}
		default:
			return state
	}
}
