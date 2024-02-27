"use strict";
// import passport from 'passport';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { IUser } from '../types/userType'; 
// import User from '../models/User';
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: '2bfcfebf7e474fa5b4ff1bf8a5140676b1915be9df6c5d8f4b57ed096d13942a'
// };
// const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
//   try {
//     const user = await User.findById(payload.sub);
//     if (user) {
//       done(null, user);
//     } else {
//       done(null, false);
//     }
//   } catch (error) {
//     done(error, false);
//   }
// });
// passport.use(jwtLogin);
// export default passport;
