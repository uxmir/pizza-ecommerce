import express from 'express'
import cookieParser from 'cookie-parser'
import AuthRoute from './module/auth/auth.routes.js'
import passport from 'passport'
import  '../src/common/config/passport.google.auth.js'
const app =express()
app.use(cookieParser())
app.use(passport.initialize())
//route 
app.use('/api/v1/auth',AuthRoute)
export default app