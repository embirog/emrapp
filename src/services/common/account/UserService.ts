import { Constants } from './../Constants';
import * as bcrypt from 'bcryptjs';
import { ResponseObj } from './../../../models/common/base/RespModel';
import User = require('./../../../models/common/access/User');
import * as winston from 'winston';

let constants = new Constants();
let response: ResponseObj;

const DEFAULT_USER_SORTBY = "userName";
// const DEFAULT_USER_COLS = "userName fullName contactInfo personalInfo addressInfo";

export class UserService {

    logger: any;
    // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }

    constructor() {
        this.logger = winston;
        response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
    }

    /**
     * This method retrieves all users of the application
     * @param cols 
     * @param sortby 
     */
    getUsers(cols: string, sortby: string) {

        let sortCriteria: string = sortby || DEFAULT_USER_SORTBY;
        let colsCriteria: string = cols || constants.USER_DEFAULT_COLS;
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
    getUser(id: string, cols: string) {
        let colsCriteria: string = cols || constants.USER_DEFAULT_COLS;
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

    createUser(userObj: any) {
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
                if (err) throw err;
                newuser.password = hash;
                newuser.save();
            });
        });
        return response;
    }

    updateUser(id: string, userDetails: any) {
        // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
        return User.findOne({ 'userName': id })
            .limit(constants.QUERY_LIMIT)
            .select({})
            .exec()
            .then((user) => {
                console.log(user)
                user.fullName = userDetails.fullName;
                user.contactInfo = userDetails.contactInfo;
                user.personalInfo = userDetails.personalInfo;
                user.addressInfo = userDetails.addressInfo;
                user.save();
                return response;
            });
    }

    deleteUser(id: string) {
        // response = { code: constants.SUCCESS_CODE, message: constants.SUCCESS_DESC }
        return User.remove({ 'userName': id })
            .exec()
            .then((user) => {
                return response;
            });
    }
}

export default UserService;
