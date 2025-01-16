const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'User must have a firstName!'],
        maxlength: [20, 'User firstName must be shorter than or equal to 20 characters!'],
        minlength: [2, 'User firstName must be at least 2 characters long!'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'User must have a lastName!'],
        maxlength: [20, 'User lastName must be shorter than or equal to 20 characters!'],
        minlength: [3, 'User lastName must be at least 3 characters long!'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'User must have an email!'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address!'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'User must have a password!'],
        // validate: {
        //     validator: function (value) {
        //         return validator.isStrongPassword(value, {
        //             minLength: 8,
        //             minUppercase: 1,
        //         });
        //     },
        //     message: 'Password must be at least 8 characters long and contain at least one uppercase letter!',
        // },
    },
    rePassword: {
        type: String,
        required: [true, 'User must have a rePassword!'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords do not match!',
        },
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.rePassword = undefined;
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
