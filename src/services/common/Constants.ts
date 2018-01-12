// import { UserProfile } from './../../models/common/access/UserProfile';
import { ResponseObj } from './../../models/common/base/RespModel';

export class Constants {
    constructor() { }

    public QUERY_LIMIT = 100;

    public SUCCESS_CODE = '000000';
    public SUCCESS_DESC = 'Success';
    public FAILED_CODE = '999999';
    public FAILED_DESC = 'Failed';

    public RESPONSE_FAILED: ResponseObj = {
        code: this.FAILED_CODE,
        message: this.FAILED_DESC
    };

    public RESPONSE_SUCCESS: ResponseObj = {
        code: this.SUCCESS_CODE,
        message: this.SUCCESS_DESC
    };
    
    public FAILED_CODE_NODATA = '100001';
    public FAILED_DESC_NODATA = 'No record found!';

    public SUCCESS_DESC_INSERT = "Successfully inserted # record(s).";
    public SUCCESS_DESC_UPDATE = "Successfully updated # record(s).";
    public SUCCESS_DESC_DELETE = "Successfully deleted # record(s).";

    public FAILED_DESC_BADREQUEST = 'Unsupported request';
    public FAILED_DESC_RESIDINVALID = 'Resource id is invalid';

    public FAILED_CODE_DBERR = '100003';
    public FAILED_DESC_DBERR = 'Database error encountered!';

    public FAILED_CODE_CUD = '100004';
    public FAILED_DESC_CUD = 'Failed inserting/updating record(s).';
    public FAILED_DESC_NOUPDATE = 'Previous and current values are the same. No record is modified';
    public FAILED_DESC_DELETE = 'No record deleted.';


    public BASE_URL = "http:/localhost:3000";

    public BASE_APIURL = "http:/localhost:3000/api";
    public API = "/api";

    public KEY_ID = "id";
    public KEY_HREF = "href";
    public KEY_EMP_DETAILS = "employeeDetails";

    public PROFILECODE_ADMIN = "PF2017000000";

    public USER_DEFAULT_COLS = "userName fullName contactInfo personalInfo addressInfo";
    public USER_DEFAULT_COLS_ALL = "_id userName status userType fullName contactInfo personalInfo addressInfo";

    public TableAlias = {
        UserContactInfo: "contactInfo",
        UserEmployeeInfo: "employeeInfo",
        UserEmployeeAssignment: "assignmentInfo",
        UserProfile: "userProfile",
        UserSecurityProfile: "userSecurityProfile",
        Profile: "profile"
    }

    public PaginationConfig = {
        DefaultPage: 0,
        DefaultPerPage: 10
    }

    public HttpReturnValues = {
        GET_PUT_PATCH_DELETE_OK: 200,
        POST_CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        NOT_ALLOWED: 405,
        SERVER_ERROR: 500
    }

    public HttpMethods = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    }

    // public routes = {
    //     home: "/",
    //     apihome: "/api",
    //     employees: "/api/employees",
    //     queries: "/api/queries",
    //     profiles: "/api/profiles",
    //     users: "/api/users",
    //     access: "/api/access"
    // }

    // public columnsToExclude = {
    //     EXCLUDE_PROFILE_COLS: ['createdby', 'createddate', 'updatedby', 'updateddate', 'version'],
    //     EXCLUDE_USERSEC_COLS: ['version'],
    //     EXCLUDE_ACCESS_RIGHTS_COLS: ['createdby', 'createddate', 'updatedby', 'updateddate', 'version'],
    //     EXCLUDE_USER_COLS: ['creator', 'created', 'modifier', 'modified', 'suffix', 'title'],
    //     EXCLUDE_CONTACTINFO_COLS: ['address2', 'address3', 'zipcode', 'manid'],
    //     EXCLUDE_EMPINFO_COLS: ['teamleader', 'projectmanager', 'maturity', 'gmc', 'costrateid', 'manid'],
    //     EXCLUDE_ASSIGNMENT_COLS: ['familycode', 'locationcode', 'manid']
    // }
}

