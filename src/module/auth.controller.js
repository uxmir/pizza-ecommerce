import ApiError from "../common/utils/response.error";
import ApiResponse from "../common/utils/response.success.js";
import AuthService from "../module/auth.service.js";
const signup = async (req, res) => {
  const user = await AuthService.signup(req.body);
  if (!user) throw ApiError.badRequest("user is not created");
  ApiResponse.created(res, "user is created", user);
};
const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await AuthService.login(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  ApiResponse.ok(res, "user logged in", { user, accessToken });
};
const logout = async (req, res) => {
  await AuthService.logout(req.user?.id);
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "user logged out");
};
const forgotPassword = async (req, res) => {
  await AuthService.forgotPassword(req.body.email);
  ApiResponse.ok(res, "password restored");
};
const updatePassword = async (req, res) => {
  await AuthService.updatePassword(req.params.token, req.body.password);
  ApiResponse.ok(res, "password is updated");
};
export { signup, login, logout, forgotPassword, updatePassword };
