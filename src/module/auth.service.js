import { sendResetPasswordEmail, sendVerificationEmail } from "../common/config/email.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
} from "../common/utils/jwt.js";
import ApiError from "../common/utils/response.error.js";
import User from "../module/auth.model.js";
import crypto from "crypto";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");
const signup = async ({ name, email, password, confirmPassword }) => {
  try {
    if (!name || !email || !password || !confirmPassword)
      throw ApiError.notFound(
        "name,email,password or confirmPassword  is missing",
      );
    const exist = await User.findOne({ email });
    if (exist) throw ApiError.conflict("this user is already registered");
    const { rawToken, hashedToken } = generateResetToken();
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      verificationToken: hashedToken,
    });
    //verification after signup by email
    try {
      await sendVerificationEmail(email, rawToken);
    } catch (error) {
      console.error(error.message);
    }
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.confirmPassword;
    delete userObj.verificationToken;
    return {
      user: userObj,
    };
  } catch (error) {
    throw ApiError.badRequest(`internal server error${error.message}`);
  }
};

const login = async ({ email, password }) => {
  try {
    if (!email || !password)
      throw ApiError.notFound("email or password   is missing");
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw ApiError.notFound("this user didn't register");
    const ismatch = await User.comparePassword(password);
    if (!ismatch) throw ApiError.conflict("password is not matching");
    const accessToken = generateAccessToken({
      id: user?._id,
      role: user?.role,
    });
    const refreshToken = generateRefreshToken({
      id: user?._id,
      role: user?.role,
    });
    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;
    return { user: userObj, accessToken, refreshToken };
  } catch (error) {
    throw ApiError.badRequest(`internal server error${error.message}`);
  }
};

const logout = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  } catch (error) {
    throw ApiError.badRequest(`internal server error${error.message}`);
  }
};

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) ApiError.unauthorized("this email is not found in user");
    const { rawToken, hashedToken } = generateResetToken();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 + 60 + 1000;
    await user.save();
    try {
       await sendResetPasswordEmail(email,rawToken) 
    } catch (error) {
      throw ApiError.badRequest(error.message)  
    }
  } catch (error) {
    throw ApiError.badRequest(`internal server error${error.message}`);
  }
};
const updatePassword = async (token, newPassword) => {
  try {
    const hashedToken = hashToken(token);
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires");
    if (!user) ApiError.unauthorized("user is not found");
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  } catch (error) {
    throw ApiError.badRequest(`internal server error${error.message}`);
  }
};
export { signup, login, logout, forgotPassword, updatePassword };
