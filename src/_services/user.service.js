import { authHeader, config } from "../_helpers"

export const groomerService = {
	getAllGroomer,
	getInfoOfGroomer,
	addNewGroomer,
	updateGroomer,
	loginGroomer,
	deleteGroomer,
	logoutGroomer
}

export const breedTypeService = {
	getAllBreed,
	getInfoOfBreed,
	addBreed,
	deleteBreed
}

export const groomingTypeService = {
	getAllGroomingType,
	getInfoOfGroomingType,
	AddGroomingType,
	deleteGroomingType
}

export const clientService = {
	getAllClientsInfo,
	getClientInfo,
	addNewClient,
	updateClient,
	loginClient,
	deleteClient,
	logoutClient
}

export const dogService = {
	getAllDogs,
	addNewDog,
	updateDog,
	deleteDog
}

export const appointmentService = {
	getClientAppointment,
	getGroomerAppointment,
	addAppointment,
	deleteAppointment,
	getAllBreed,
	getAllGroomingType
}

// Groomer request
function getAllGroomer() {
	return postRequest("/Groomer.svc/ViewAll")
}

function getInfoOfGroomer(index) {
	return postRequest("/Groomer.svc/View/" + index)
}

function addNewGroomer(user) {
	console.log(user)
	var firstName = user.firstName
	var lastName = user.lastName
	var email = user.email
	var password = user.password
	var groomerInfo = firstName + "/" + lastName + "/" + email + "/" + password
	return postRequest("/Groomer.svc/Add/" + groomerInfo)
}

function updateGroomer(index, firstName, lastName, email, password) {
	var groomerInfo = firstName + "/" + lastName + "/" + email + "/" + password
	return postRequest("/Groomer.svc/Update/" + index + "/" + groomerInfo)
}

function loginGroomer(email, password) {
	const requestOptions = {
		method: "GET"
	}

	return fetch(
		config.apiUrl + "/Groomer.svc/Authenticate/" + email + "/" + password,
		requestOptions
	)
		.then(handleResponse, handleError)
		.then(user => {
			// login successful if there's a jwt token in the response
			if (user) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem("user", JSON.stringify(user))
				console.log("localStorage.getItem()")
				console.log(localStorage.getItem("user"))
			}

			return user
		})
}

function deleteGroomer(index) {
	return postRequest("/Groomer.svc/Delete/" + index)
}

function logoutGroomer() {
	// remove user from local storage to log user out
	localStorage.removeItem("groomer")
}

//Breed

function getAllBreed() {
	return postRequest("/Breed.svc/ViewAll")
}

function getInfoOfBreed(index) {
	return postRequest("/Breed.svc/View/" + index)
}

function addBreed(name) {
	return postRequest("/Breed.svc/Add/" + name)
}

function deleteBreed(index) {
	return postRequest("/Breed.svc/Delete/" + index)
}

// Grooming type

function getAllGroomingType() {
	return postRequest("/GroomingType.svc/ViewAll")
}

function getInfoOfGroomingType(index) {
	return postRequest("/GroomingType.svc/View/" + index)
}

function AddGroomingType(name) {
	return postRequest("/GroomingType.svc/Add/" + name)
}

function deleteGroomingType(index) {
	return postRequest("/GroomingType.svc/Delete/" + index)
}

// client
function getAllClientsInfo() {
	return postRequest("/Client.svc/ViewAll")
}

function getClientInfo(index) {
	return postRequest("/Client.svc/View/" + index)
}

function addNewClient(user) {
	console.log(user)
	var firstName = user.firstName
	var lastName = user.lastName
	var email = user.email
	var password = user.password
	var homeAddress = user.homeAddress
	var mobilePh = user.mobilePh

	var info =
		firstName +
		"/" +
		lastName +
		"/" +
		email +
		"/" +
		password +
		"/" +
		homeAddress +
		"/" +
		mobilePh +
		"/" +
		"000000000" +
		"/" +
		"0000000000"
	return postRequest("/Client.svc/Add/" + info)
}

function updateClient(
	firstname,
	surname,
	email,
	password,
	homeAddress,
	mobilePh,
	workPhone,
	homePhone
) {
	var info =
		firstname +
		"/" +
		surname +
		"/" +
		email +
		"/" +
		password +
		"/" +
		homeAddress +
		"/" +
		mobilePh +
		"/" +
		workPhone +
		"/" +
		homePhone
	return postRequest("/Client.svc/Update/" + info)
}

function loginClient(email, password) {
	const requestOptions = {
		method: "GET"
	}

	return fetch(
		config.apiUrl + "/Client.svc/Authenticate/" + email + "/" + password,
		requestOptions
	)
		.then(handleResponse, handleError)
		.then(user => {
			// login successful if there's a jwt token in the response
			if (user) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem("user", JSON.stringify(user))
			}

			return user
		})
}

function deleteClient(index) {
	return postRequest("/Client.svc/Delete/" + index)
}

function logoutClient() {
	// remove user from local storage to log user out
	localStorage.removeItem("client")
}

// Appointment
function getClientAppointment(clientID) {
	console.log("test   " + clientID)
	return postRequest("/Appointment.svc/ViewAllClient/" + clientID)
}

function getGroomerAppointment(groomerID) {
	return postRequest("/Appointment.svc/ViewAllGroomer/" + groomerID)
}

function addAppointment(appointment) {
	var idGroomer = appointment.idGroomer
	var idDog = appointment.idDog
	var startTime = appointment.startTime
	var idGroomingType = appointment.idGroomingType
	var duration = appointment.duration
	var comments = appointment.comments

	var info =
		idGroomer +
		"/" +
		idDog +
		"/" +
		startTime +
		"/" +
		idGroomingType +
		"/" +
		duration +
		"/" +
		comments
	return postRequest("/Appointment.svc/Add/" + info)
}

function deleteAppointment(appointment) {
	var IdGroomer = appointment.IdGroomer
	var dogID = appointment.IdDog
	var startTime = new Date(appointment.StartTime)
	var timeStr =
		"" +
		startTime.getFullYear() +
		"-" +
		startTime.getDate() +
		"-" +
		(startTime.getMonth() + 1) +
		"-" +
		startTime.getHours() +
		"-" +
		startTime.getMinutes() +
		"-" +
		startTime.getSeconds()
	console.log("deleteAppointment")
	console.log(startTime)
	console.log(timeStr)
	return postRequest(
		"/Appointment.svc/delete/" + IdGroomer + "/" + dogID + "/" + timeStr
	)
}

//"12/05/2018 2:20:30 PM"
function reformDate(timeStr) {
	var year = timeStr.substring(6, 9)
	var month = timeStr.substring(3, 4)
	var day = timeStr.substring(0, 1)
	var hour = timeStr.substring(11, 11)
}

// dog

function getAllDogs(clientID) {
	return postRequest("/Dog.svc/ViewAllClient/" + clientID)
}

function updateDog(dog) {
	var idDog = dog.idDog
	var idClient = dog.idClient
	var name = dog.name
	var birthDate = dog.birthDate
	var idBreed = dog.idBreed

	var info =
		idDog + "/" + idClient + "/" + name + "/" + birthDate + "/" + idBreed

	return postRequest("/Dog.svc/Update/" + info)
}

function addNewDog(dog) {
	var idClient = dog.idClient
	var name = dog.name
	var birthDate = dog.birthDate
	var idBreed = dog.idBreed

	var info = idClient + "/" + name + "/" + birthDate + "/" + idBreed

	return postRequest("/Dog.svc/Add/" + info)
}

function deleteDog(dogID) {
	return postRequest("/Dog.svc/Delete/" + dogID)
}

function postRequest(info) {
	const requestOptions = {
		method: "GET"
	}

	return fetch(config.apiUrl + info, requestOptions).then(
		handleResponse,
		handleError
	)
}

function handleResponse(response) {
	return new Promise((resolve, reject) => {
		if (response.ok) {
			// return json if it was returned in the response
			var contentType = response.headers.get("content-type")
			if (contentType && contentType.includes("application/json")) {
				response.json().then(function(json) {
					console.log("handleResponse")
					console.log(json)
					resolve(json)
				})
			} else {
				resolve()
			}
		} else {
			// return error message from response body
			response.text().then(function(text) {
				console.log(text)
				var substring = "The exception message is "
				var substring2 = ". See server logs for more details."
				var index = text.indexOf(substring)
				var index2 = text.indexOf(substring2)
				var error = text.substring(index, index2)
				reject(error)
			})
		}
	})
}

function handleError(error) {
	return Promise.reject(error && error.message)
}
