// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const ridesSchema = {
  $id: 'Rides',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'text'],
  properties: {
    _id: ObjectIdSchema(),
    text: { type: 'string' }
  }
}
export const ridesValidator = getValidator(ridesSchema, dataValidator)
export const ridesResolver = resolve({})

export const ridesExternalResolver = resolve({})

// Schema for creating new data
export const ridesDataSchema = {
  $id: 'RidesData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...ridesSchema.properties
  }
}
export const ridesDataValidator = getValidator(ridesDataSchema, dataValidator)
export const ridesDataResolver = resolve({})

// Schema for updating existing data
export const ridesPatchSchema = {
  $id: 'RidesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...ridesSchema.properties
  }
}
export const ridesPatchValidator = getValidator(ridesPatchSchema, dataValidator)
export const ridesPatchResolver = resolve({})

// Schema for allowed query properties
export const ridesQuerySchema = {
  $id: 'RidesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(ridesSchema.properties)
  }
}
export const ridesQueryValidator = getValidator(ridesQuerySchema, queryValidator)
export const ridesQueryResolver = resolve({})
