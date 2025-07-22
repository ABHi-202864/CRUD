import userModel from "../model/userModel.js";

// Save user into DataBase!
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
    // res.status(200).json({ message: "User Add Successfuly!"});

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All User!
export const getAllUsers = async (req, res) => {
  try {
    const userData = await userModel.find();

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found" });
    }

    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

// Get a single user
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userExist);

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

// Update a user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = await userModel.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updateData);

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    await userModel.findByIdAndDelete(id);

    res.status(200).json({ message: "User Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}