"use strict";
const mongoose = require("mongoose");
;
class Address {
}
class FullName {
}
class ContactInfo {
}
class PersonalInfo {
}
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
    'userType': { type: String, required: true, default: 'INTERNAL' },
    'lastLoginDate': Date,
    'status': { type: String, required: true, default: 'ACTIVE' },
    'createdBy': { type: String, required: false, default: 'SYSTEM' },
    'createdDate': { type: Date, default: Date.now() },
    'updatedBy': { type: String, required: false },
    'updatedDate': { type: Date }
});
var User = mongoose.model("User", userSchema);
module.exports = User;
