import userModel from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing!" });
    }

    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new userModel({ name, email, address });
    const saveUserData = await newUser.save();

    res.status(200).json(saveUserData);

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
