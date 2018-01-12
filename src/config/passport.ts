// import { UserSecurityProfile } from './../models/common/access/UserSecurityProfile';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as config from 'config';

let cfg = config.get('jwtConfig') ;  
let ExtractJwt = passportJWT.ExtractJwt;  
let Strategy = passportJWT.Strategy;  
let params = {  
    secretOrKey: cfg.jwtSecret ,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

//
let strategy = new Strategy(params, function(payload, done) {
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
export default passport;
    