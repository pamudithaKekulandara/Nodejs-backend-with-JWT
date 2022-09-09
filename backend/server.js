import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.routes.js'
import usersRoute from './routes/user.routes.js'
import hotelsRoute from './routes/hotels.routes.js'
import itemsRoute from './routes/items.routes.js'

const app = express()
dotenv.config()

import mysql from 'mysql'
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '8200994pm',
  database: 'vms',
})
connection.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

//middlewares
//

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500
//   const errorMessage = err.message || 'Something went wrong!'
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   })
// })
// const port=process.env.PORT || 5000
// app.listen(port, () => {
//   connect()
//   console.log(`Connected to port ${port}.`)
// })
