import { appointmentConstants } from "../_constants"

export function dogs(state = {}, action) {
	switch (action.type) {
		case appointmentConstants.DOG_VIEW:
			return {
				loading: true
			}
		case appointmentConstants.DOG_VIEW_SECCESS:
			return {
				items: action.dogs
			}
		case appointmentConstants.DOG_VIEW_FAILURE:
			return {
				error: action.error
			}
		case appointmentConstants.DOG_DELETE:
			// add 'deleting:true' property to user being deleted
			return {
				...state,
				items: state.items.map(dog =>
					dog.id === action.id ? { ...dog, deleting: true } : dog
				)
			}
		case appointmentConstants.DOG_DELETE_SUCCESS:
			// remove deleted user from state
			return {
				items: state.items.filter(dog => dog.id !== action.id)
			}
		case appointmentConstants.DOG_DELETE_FAILURE:
			// remove 'deleting:true' property and add 'deleteError:[error]' property to user
			return {
				...state,
				items: state.items.map(dog => {
					if (dog.id === action.id) {
						// make copy of user without 'deleting:true' property
						const { deleting, ...dogCopy } = dog
						// return copy of user with 'deleteError:[error]' property
						return { ...dogCopy, deleteError: action.error }
					}

					return dog
				})
			}
		default:
			return state
	}
}
