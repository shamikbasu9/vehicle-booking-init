// src/pages/Login.js
import client from '../feathers';

const login = async (email, password) => {
  await client.authenticate({
    strategy: 'local',
    email,
    password,
  });
};
