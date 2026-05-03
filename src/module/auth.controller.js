import ApiError from "../common/utils/response.error";
import ApiResponse from "../common/utils/response.success.js";
import AuthService from "../module/auth.service.js";
const signup = async (req, res) => {
  const user = await AuthService.signup(req.body);
  if (!user) throw ApiError.badRequest("user is not created");
  ApiResponse.created(res, "user is created", user);
};

export { signup };
