const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const saltRounds = 10;

const registerNewUser = async (req, res) => {
  console.log(req.body);
//   const { userName, email, password } = req.body;
  //   try {
  //     const hashedPassword = await bcrypt.hash(password, saltRounds);
  //     await User('users').insert({
  //       userName,
  //       email,
  //       password: hashedPassword
  //     });
  //     res.status(201).json({ message: "User registered successfully" });
  //   } catch (error) {
  //     res.status(500).json({ error: "Error registering user" });
  //   }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User("users").where({ email }).first();
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

module.exports = { registerNewUser, loginUser };
