import { rides } from './rides/rides.js'
import { user } from './users/users.js'
import otpClass from './otp/otp.class.js'
import verifyOtpClass from './otp/verifyOtp.class.js'
import 'dotenv/config';

export const services = app => {
  app.configure(rides)

  app.configure(user)
  
  app.use('/send-otp', new otpClass());

  app.use('/verify-otp', new verifyOtpClass());
}
