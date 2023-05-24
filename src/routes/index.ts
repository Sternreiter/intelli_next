import express from 'express'
const app = express();
import user from './user-routes';

app.use(user)

module.exports = app;