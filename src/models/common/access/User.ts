import mongoose = require("mongoose");

interface IUser {
    userName?: string;
    password?: string;
    manID?: string;

    fullName?: FullName;
    contactInfo?: ContactInfo;
    personalInfo?: PersonalInfo;
    addressInfo?: Address;

    userType?: string;
    status?: string;
    createdBy?: string;
    createdDate?: string;
    updatedBy?: string;
    updatedDate?: string;
};

class Address {
    addressName?: string;
    zipCode?: string;
}

class FullName {
    lastName?: string;
    givenName?: string;
    middleName?: string;
    suffix?: string;
    title?: string;
}

class ContactInfo {
    email?: string;
    contactNumber?: string;
}

class PersonalInfo {
    birthDate?: string;
    gender?: string;
    civilStatus?: string;
}

interface IUserModel extends IUser, mongoose.Document { }

const userSchema = new mongoose.Schema({
    'userName': { type: String, required: true },
    'password': { type: String, required: true },
    'manID': { type: String, unique: false, required: false },
    'fullName': {
        'lastName': { type: String, required: false },
        'firstName': { type: String, required: false },
        'middleName': { type: String, required: false },
        'suffix': { type: String, required: false },
        'title': { type: String, required: false },
        'wholeName': { type: String, required: false }
    },
    'contactInfo': {
        'email': { type: String, required: false },
        'landLine': { type: String, required: false },
        'contactNumber': { type: String, required: false },
    },
    'personalInfo': {
        'birthDate': Date,
        'gender': { type: String, required: false },
        'civilStatus': { type: String, required: false },
    },
    'employeeInfo': {
        'employmentType': String,
        'dateHired': Date,
        'dateResigned': Date,
    },
    'addressInfo': {
        'addressName': { type: String, required: false },
        'zipCode': { type: String, required: false }
    },
    'userType': { type: String, required: true },
    'lastLoginDate': Date,
    'status': { type: String, required: true },
    'createdBy': { type: String, required: false },
    'createdDate': { type: Date, default: Date.now() },
    'updatedBy': { type: String, required: false },
    'updatedDate': { type: Date }
});

var User = mongoose.model<IUserModel>("User", userSchema);
export = User;
