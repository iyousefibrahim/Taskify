const bcryptjs = require('bcryptjs');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');
const mongoSanitize = require('mongo-sanitize');

exports.getUserById = asyncWrapper(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findById(id).select('-password -rePassword');

    if (!user) {
        const error = AppError.create('No User Found!', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.register = asyncWrapper(async (req, res, next) => {

    const sanitizedBody = mongoSanitize(req.body);

    const { firstName, lastName, email, password } = sanitizedBody;

    const isExists = await User.findOne({ email });
    if (isExists) {
        const error = AppError.create('User Already Exists!', 400);
        return next(error);
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = await new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        rePassword: hashedPassword,
    });

    // Generate Token
    const token = await generateJWT({ email: user.email, id: user._id });

    user.token = token;
    await user.save();

    // Hide Password & rePassword from the response
    user.password = undefined;
    user.rePassword = undefined;

    res.status(201).json({
        status: 'success',
        data: {
            user,
        }
    });
});

exports.login = asyncWrapper(async (req, res, next) => {

    const sanitizedBody = mongoSanitize(req.body);

    const { email, password } = sanitizedBody;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcryptjs.compare(password, user.password))) {
        const error = AppError.create('Invalid Email or Password!', 401);
        return next(error);
    }
    else {
        user.password = undefined;
        user.rePassword = undefined;
        const token = await generateJWT({ email: user.email, id: user._id });

        res.status(200).json({
            status: 'success',
            message: 'User Logged In Successfully!',
            data: {
                token
            }
        });
    }

});