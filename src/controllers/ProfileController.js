const Profile = require('../models/Profile');
const ProfileUtils = require('../utils/ProfileUtils');

module.exports = {
  async index(req, res) {    
    const profile = await Profile.get()
    return res.render('profile', { profile: profile })
  },

  async update(req, res) {

    const profile = await Profile.get()
    // chama a funçao que calcula o valor da hora
    const valueHour = ProfileUtils.calculateValueHours(req.body);

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    });

    return res.redirect('/profile')
  }
}