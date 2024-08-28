import User from "../../models/User.js";
import Channel from "../../models/Channel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).send("All fields are required");
    }

    // Normalize email to prevent case sensitivity issues
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.exists({ email: normalizedEmail });
    if (userExists) {
      return res.status(409).send("E-mail already in use");
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new channel
    const newChannel = await Channel.create({});

    // Create a new user
    const user = await User.create({
      username,
      email: normalizedEmail,
      password: encryptedPassword,
      channel: newChannel._id,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "8h",
      }
    );

    // Respond with user details
    return res.status(201).json({
      userDetails: {
        email: user.email,
        username,
        token,
      },
    });
  } catch (err) {
    console.error(err); // Log the actual error for debugging
    return res.status(500).send("Error occurred. Please try again.");
  }
};
