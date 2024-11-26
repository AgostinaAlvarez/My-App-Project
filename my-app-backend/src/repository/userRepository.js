import User from "../models/userModel.js";

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }
  async findByUserName(username) {
    return await User.findOne({ username });
  }

  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }
}

export default new UserRepository();
