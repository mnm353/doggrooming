import { combineReducers } from "redux"

import { authentication } from "./authentication.reducer"
import { registration } from "./registration.reducer"
import { users } from "./users.reducer"
import { alert } from "./alert.reducer"
import { appointments } from "./appointment.reducer"
import { breeds } from "./breed.reducer"
import { groomingTypes } from "./groomingType.reducer"
import { dogs } from "./dogs.reducer"

const rootReducer = combineReducers({
	authentication,
	registration,
	users,
	alert,
	appointments,
	breeds,
	groomingTypes,
	dogs
})

export default rootReducer
