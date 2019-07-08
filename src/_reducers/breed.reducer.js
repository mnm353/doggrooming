import { appointmentConstants } from "../_constants"

export function breeds(state = {}, action) {
	switch (action.type) {
		case appointmentConstants.BREED_VIEW:
			return {
				loading: true
			}
		case appointmentConstants.BREED_VIEW_SECCESS:
			return {
				items: action.breeds
			}
		case appointmentConstants.BREED_VIEW_FAILURE:
			return {
				error: action.error
			}
		default:
			return state
	}
}
