export const ridesPath = 'rides'

export const ridesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const ridesClient = client => {
  const connection = client.get('connection')

  client.use(ridesPath, connection.service(ridesPath), {
    methods: ridesMethods
  })
}
