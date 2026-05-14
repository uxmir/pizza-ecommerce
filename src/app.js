import express from 'express'
import cookieParser from 'cookie-parser'
import AuthRoute from './module/auth/auth.routes.js'
import PizzaRoute from './module/pizza/pizzza.routes.js'
import CartRoute from './module/cart/cart.rotes.js'
import FavoriteRoute from './module/favoriteList/favorite.routes.js'
import passport from 'passport'
import  '../src/common/config/passport.google.auth.js'
const app =express()
app.use(cookieParser())
app.use(passport.initialize())

/*==============routes============*/
//auth
app.use('/api/v1/auth',AuthRoute)
//pizza crud
app.use('/api/v2/pizza',PizzaRoute)
//cart
app.use('/api/v3/cart',CartRoute)
//favorite
app.use('/api/v4/favorite',FavoriteRoute)
export default app