"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { UserSecurityProfile } from './../models/common/access/UserSecurityProfile';
const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require("config");
let cfg = config.get('jwtConfig');
let ExtractJwt = passportJWT.ExtractJwt;
let Strategy = passportJWT.Strategy;
let params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};
//
let strategy = new Strategy(params, function (payload, done) {
    console.log("payload: ", payload);
    // UserSecurityProfile.findOne({
    //     where: { username: payload.id }
    // }).then(user => {
    //     if(user){
    //         done(null, user.dataValues);                
    //     }else{
    //         done(new Error("Authorization failed. User not found"), null);                
    //     }
    // }).catch(error => {
    //     console.log("Error encountered while giving authorization.");
    //     done(error, false);
    // });
});
passport.use(strategy);
exports.default = passport;
