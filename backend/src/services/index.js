import { rides } from './rides/rides.js'
import { user } from './users/users.js'
export const services = app => {
  app.configure(rides)

  app.configure(user)

  // All services will be registered here
}
