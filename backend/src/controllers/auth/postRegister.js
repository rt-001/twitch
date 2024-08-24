import User from "../../models/User.js";

export const postRegister = async (req, res) => {
  const user = await User.create({
    username: "Mark",
    email: "test@ad.com",
    password: "password",
  });

  return res.send("user has been added to database");
};
