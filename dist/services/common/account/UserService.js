"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./../Constants");
const bcrypt = require("bcryptjs");
const User = require("./../../../models/common/access/User");
const winston = require("winston");
let constants = new Constants_1.Constants();
let response;
const DEFAULT_USER_SORTBY = "userName";
// const DEFAULT_USER_COLS = "userName fullName contactInfo personalInfo addressInfo";
class UserService {
    // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
    constructor() {
        this.logger = winston;
        response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC };
    }
    /**
     * This method retrieves all users of the application
     * @param cols
     * @param sortby
     */
    getUsers(cols, sortby) {
        let sortCriteria = sortby || DEFAULT_USER_SORTBY;
        let colsCriteria = cols || constants.USER_DEFAULT_COLS;
        // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
        return User.find({ status: 'ACTIVE' })
            .limit(constants.QUERY_LIMIT)
            .sort(sortCriteria)
            .select(colsCriteria)
            .exec()
            .then((user) => {
            response.payload = user;
            return response;
        });
    }
    /**
     * This method retrieves a specific user
     * @param id
     * @param cols
     */
    getUser(id, cols) {
        let colsCriteria = cols || constants.USER_DEFAULT_COLS;
        // const response: ResponseObj = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
        return User.findOne({ 'userName': id })
            .limit(constants.QUERY_LIMIT)
            .select(colsCriteria)
            .exec()
            .then((user) => {
            response.payload = user;
            return response;
        });
    }
    createUser(userObj) {
        // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
        const newuser = new User({
            userName: (userObj.fullName.firstName.charAt(0) +
                userObj.fullName.lastName).toLowerCase() +
                (Date.now() / 1000 | 0),
            password: userObj.password,
            fullName: userObj.fullName,
            contactInfo: userObj.contactInfo,
            personalInfo: userObj.personalInfo,
            addressInfo: userObj.addressInfo
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newuser.password, salt, (err, hash) => {
                if (err)
                    throw err;
                newuser.password = hash;
                newuser.save();
            });
        });
        return response;
    }
    updateUser(id, userDetails) {
        // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
        return User.findOne({ 'userName': id })
            .limit(constants.QUERY_LIMIT)
            .select({})
            .exec()
            .then((user) => {
            console.log(user);
            user.fullName = userDetails.fullName;
            user.contactInfo = userDetails.contactInfo;
            user.personalInfo = userDetails.personalInfo;
            user.addressInfo = userDetails.addressInfo;
            user.save();
            return response;
        });
    }
    deleteUser(id) {
        // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
        return User.remove({ 'userName': id })
            .exec()
            .then((user) => {
            return response;
        });
    }
}
exports.UserService = UserService;
exports.default = UserService;
