// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  ridesDataValidator,
  ridesPatchValidator,
  ridesQueryValidator,
  ridesResolver,
  ridesExternalResolver,
  ridesDataResolver,
  ridesPatchResolver,
  ridesQueryResolver
} from './rides.schema.js'
import { RidesService, getOptions } from './rides.class.js'
import { ridesPath, ridesMethods } from './rides.shared.js'

export * from './rides.class.js'
export * from './rides.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const rides = app => {
  // Register our service on the Feathers application
  app.use(ridesPath, new RidesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ridesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ridesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(ridesExternalResolver),
        schemaHooks.resolveResult(ridesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(ridesQueryValidator), schemaHooks.resolveQuery(ridesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(ridesDataValidator), schemaHooks.resolveData(ridesDataResolver)],
      patch: [schemaHooks.validateData(ridesPatchValidator), schemaHooks.resolveData(ridesPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
