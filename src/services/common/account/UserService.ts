import { Constants } from './../Constants';
import * as bcrypt from 'bcryptjs';
import { ResponseObj } from './../../../models/common/base/RespModel';
import User = require('./../../../models/common/access/User');
import * as winston from 'winston';

let constants = new Constants();
let response: ResponseObj;

const DEFAULT_USER_SORTBY = "userName";

export class UserService {

    logger: any;

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

        return User.findOne({ 'userName': id })
            .limit(constants.QUERY_LIMIT)
            .select(colsCriteria)
            .exec()
            .then((user) => {
                response.payload = user;
                return response;
            });
    }

    getUserByEmail(email: string, cols: string) {
        
        return User.findOne({ 'contactInfo.email': email }, { _id: 0 })
            .limit(constants.QUERY_LIMIT)
            .select(constants.USER_DEFAULT_COLS_BYEMAIL)
            .exec()
            .then((user) => {
                response.payload = user;
                return response;
            });
    }

    createUser(userObj: any) {
        const newuser = new User({
            userName: (userObj.fullName.firstName.charAt(0) +
                userObj.fullName.lastName).toLowerCase() +
                (Date.now() / 1000 | 0),
            userType: userObj.userType,
            status: 'ACTIVE',
            createdBy: userObj.createdBy,
            createdDate: Date.now()
        });
        if (userObj.fullName != null) {
            newuser.fullName = userObj.fullName;
        }
        if (userObj.contactInfo != null) {
            newuser.contactInfo = userObj.contactInfo;
        }
        if (userObj.personalInfo != null) {
            newuser.personalInfo = userObj.personalInfo;
        }
        if (userObj.addressInfo != null) {
            newuser.addressInfo = userObj.addressInfo;
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userObj.password, salt, (err, hash) => {
                if (err) throw err;
                newuser.password = hash;
                newuser.save();
            });
        });
        // var hash = bcrypt.hashSync(userObj.password, 10);
        // newuser.password = hash;
        newuser.save();
        return response;
    }

    updateUser(id: string, userDetails: any) {
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
        return User.remove({ 'userName': id })
            .exec()
            .then((user) => {
                return response;
            });
    }
}

export default UserService;
