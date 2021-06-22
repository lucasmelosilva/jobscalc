const Profile = require('../models/Profile');
const ProfileUtils = require('../utils/ProfileUtils');

module.exports = {
  index(req, res) {    
    return res.render('profile', { profile: Profile.get() })
  },

  update(req, res) {

    // chama a funçao que calcula o valor da hora
    const valueHour = ProfileUtils.calculateValueHours(req.body);

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
    });

    return res.redirect('/profile')
  }
}