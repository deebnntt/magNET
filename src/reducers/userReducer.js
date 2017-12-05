export default function userReducer(state = {}, action) {
	switch(action.type) {
		case 'LOG_IN':
			console.log("inside user reducer", action.payload, state)
			return Object.assign({}, state, action.payload)
		case 'REMOVE_USER':
			return state
		default:
			return state
	}
}