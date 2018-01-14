"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
    constructor() {
        this.QUERY_LIMIT = 100;
        this.SUCCESS_CODE = '000000';
        this.SUCCESS_DESC = 'Success';
        this.FAILED_CODE = '999999';
        this.FAILED_DESC = 'Failed';
        this.RESPONSE_FAILED = {
            code: this.FAILED_CODE,
            message: this.FAILED_DESC
        };
        this.RESPONSE_SUCCESS = {
            code: this.SUCCESS_CODE,
            message: this.SUCCESS_DESC
        };
        this.FAILED_CODE_NODATA = '100001';
        this.FAILED_DESC_NODATA = 'No record found!';
        this.SUCCESS_DESC_INSERT = "Successfully inserted # record(s).";
        this.SUCCESS_DESC_UPDATE = "Successfully updated # record(s).";
        this.SUCCESS_DESC_DELETE = "Successfully deleted # record(s).";
        this.FAILED_DESC_BADREQUEST = 'Unsupported request';
        this.FAILED_DESC_RESIDINVALID = 'Resource id is invalid';
        this.FAILED_CODE_DBERR = '100003';
        this.FAILED_DESC_DBERR = 'Database error encountered!';
        this.FAILED_CODE_CUD = '100004';
        this.FAILED_DESC_CUD = 'Failed inserting/updating record(s).';
        this.FAILED_DESC_NOUPDATE = 'Previous and current values are the same. No record is modified';
        this.FAILED_DESC_DELETE = 'No record deleted.';
        this.BASE_URL = "http:/localhost:3000";
        this.BASE_APIURL = "http:/localhost:3000/api";
        this.API = "/api";
        this.KEY_ID = "id";
        this.KEY_HREF = "href";
        this.KEY_EMP_DETAILS = "employeeDetails";
        this.PROFILECODE_ADMIN = "PF2017000000";
        this.USER_DEFAULT_COLS = "userName fullName contactInfo personalInfo addressInfo userType password";
        this.USER_DEFAULT_COLS_ALL = "_id userName status userType fullName contactInfo personalInfo addressInfo";
        this.USER_DEFAULT_COLS_BYEMAIL = "userName fullName contactInfo userType password";
        this.TableAlias = {
            UserContactInfo: "contactInfo",
            UserEmployeeInfo: "employeeInfo",
            UserEmployeeAssignment: "assignmentInfo",
            UserProfile: "userProfile",
            UserSecurityProfile: "userSecurityProfile",
            Profile: "profile"
        };
        this.PaginationConfig = {
            DefaultPage: 0,
            DefaultPerPage: 10
        };
        this.HttpReturnValues = {
            GET_PUT_PATCH_DELETE_OK: 200,
            POST_CREATED: 201,
            NO_CONTENT: 204,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            NOT_FOUND: 404,
            NOT_ALLOWED: 405,
            SERVER_ERROR: 500
        };
        this.HttpMethods = {
            GET: "GET",
            POST: "POST",
            PUT: "PUT",
            DELETE: "DELETE"
        };
    }
}
exports.Constants = Constants;
