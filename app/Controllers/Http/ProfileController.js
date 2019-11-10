'use strict'

const Profile = use('App/Models/Profile')
const Validator = use('App/Helpers/Validator')


class ProfileController {


  async show ({response, auth }) {
    let profile = await Profile.query().where('user_id', auth.user.id).fetch()
    return response.status(200).send(profile)
  }

  async store ({ request, response, auth }) {
    await Validator.validateData(request.all(), Profile.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(422).send(Validator.getValidationMessage())
    }
    let profile = new Profile()
    profile.user_id = auth.user.id
    profile.first_name = request.input('first_name')
    profile.last_name = request.input('last_name')
    profile.dni = request.input('dni')
    profile.phone_number = request.input('phone_number')
    profile.address = request.input('address')
    profile.photo_url = request.input('photo_url')
    await profile.save()
    return response.status(201).send(profile)
  }

  async update ({ request, response, auth }) {
    await Validator.validateData(request.all(), Profile.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(422).send(Validator.getValidationMessage())
    }
    let profile = await Profile.query().where('user_id', auth.user.id).fetch()
    profile.user_id = auth.user.id
    profile.first_name = request.input('first_name')
    profile.last_name = request.input('last_name')
    profile.dni = request.input('dni')
    profile.phone_number = request.input('phone_number')
    profile.address = request.input('address')
    profile.photo_url = request.input('photo_url')
    await profile.save()
    return response.status(201).send(profile)
  }

}

module.exports = ProfileController
