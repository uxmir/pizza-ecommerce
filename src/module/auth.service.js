import { sendVerificationEmail } from '../common/config/email.js'
import { generateAccessToken, generateResetToken } from '../common/utils/jwt.js'
import ApiError from '../common/utils/response.error.js'
import User from '../module/auth.model.js'
import crypto from 'crypto'

const hash=(token)=>crypto.createHash("sha256").update(token).digest("hex")
const signup=async({name,email,password,confirmPassword})=>{
    try {
        if(!name || !email || !password || !confirmPassword) 
        throw ApiError.notFound("name,email,password or confirmPassword  is missing")
        const exist=await User.findOne({email})  
        if(exist) throw ApiError.conflict("this user is already registered")
         const {rawToken,hashedToken}=generateResetToken()
        const user=await User.create({
            name,
            email,
            password,
            confirmPassword,
           verificationToken:hashedToken
        })
        //verification after signup by email
        try {
         await sendVerificationEmail(email,rawToken)
        } catch (error) {
          console.error(error.message)  
        }
        const userObj=user.toObject()
        delete userObj.password
        delete userObj.confirmPassword
        delete userObj.verificationToken
        return userObj
    } catch (error) {
        throw ApiError.badRequest(`internal server error${error.message}`)
    }
}

export {
    signup
}
