const User = require('../models/user');

class Repository {
    async findUserByEmail(email) {
        return User.findOne({ email });
    }

    async saveUser(user) {
        return user.save();
    }
}

module.exports = new Repository();