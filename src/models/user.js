var mongoose = require ('mongoose');
var cryptPassword = require ('../utils').cryptPassword;

var Schema = mongoose.Schema;

var user = new Schema({
    name: {type: String, trim: true, default: ''},
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
        default: ''
    },
    password: {type: String, default: '', set: cryptPassword},
}, {
    collection: 'users',
    _id: true,
    versionKey: false
});

user.path('email').validate(function (value) {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
    return emailRegex.test(value);
}, 'Please fill a valid email address');

user.methods.authenticate = function (password) {
    return this.password === cryptPassword(password);
};

module.exports = mongoose.model('user', user);