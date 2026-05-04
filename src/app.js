import express from 'express'
import cookieParser from 'cookie-parser'
import AuthRoute from './module/auth.routes.js'
const app =express()
app.use(cookieParser())

//route 
app.use('/api/v1/auth',AuthRoute)
export default app