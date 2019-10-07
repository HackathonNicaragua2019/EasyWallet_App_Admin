'use strict'

const User = use('App/Models/User')

const Validator = use('App/Helpers/Validator')

class AuthController {

	async register ( { request, auth, response } ) {
		await Validator.validateData(request.all(), User.getValidationRules())
		if (!Validator.isValidated()) {
			response.status(422).send(Validator.getValidationMessage())
		}
		let user = new User()
		user.username = request.input('username')
		user.email = request.input('email')
		user.password = request.input('password')
		await user.save()
		let accessToken = await auth.generate(user)
		response.status(201).send({ "user": user, "token": accessToken })
	}

	async login ( { request, auth, response } ) {
		await Validator.validateData(request.all(), User.getLoginValidationRules())
		if (!Validator.isValidated()) {
			response.status(422).send(Validator.getValidationMessage())
		}
		const email = request.input('email')
		const password = request.input('password')
		try {
			if (await auth.attempt(email, password)) {
				let user = await User.findBy('email', email)
				let accessToken = await auth.generate(user)
				response.status(201).send({ "user":user, "access_token": accessToken })
		}

	}
		catch (e) {
			response.status(404).send( {message: 'You first need to register!' })
		}
	}
}

module.exports = AuthController
