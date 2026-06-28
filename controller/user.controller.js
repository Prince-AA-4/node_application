import { User } from "../database/models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
// import Op from 'sequelize';

export const registerUser = async (req, res) => {
  try {
    const { fullname, username, dob, gender, contact, email, password } =
      req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "User email already exists.Please sign in or use a different email",
        });
    }
    const salt = await bcrypt.genSalt(20);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      username,
      dob,
      gender,
      contact,
      email,
      password: hashedPassword,
    });
    const token = generateToken(res, newUser.id);
    await delete newUser.dataValues.password;
    return res
      .status(201)
      .json({ message: " User created successfully", newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!!!!" });
  }
};


export const loginUser = async (req ,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where:{email}
    })
    if (!user) {
      return res.status(400).json({message: "Invalid email or password!!"})
    }
    const passwordExists = await bcrypt.compare(password, user.password)
    if (!passwordExists) {
      return res.status(400).json({message: 'Invalid email or password!!'})
    }
    const token = generateToken(res, user.id);
    await delete user.dataValues.password;
    return res.status(200).json({message: 'Sign in successfull', user, token})
    
  } catch (error) {
    console.log('Error logging in user:', error)
    return res.status(500).json({message: "Internal Server Error!!"})
    
  }
}


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findByPk(id)  
    if (!existingUser) {
      return res.status(404).json({message: 'User not found!!'})
    }
    await existingUser.destroy();
    return res.status(200).json({ message: "User deleted sucessfully!!" });
  } catch (error) {
    console.log('Error deleting user:', error)
    return res.status(500).json({ message: 'Internal server error!!'})
  }
}


export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params
    const { fullname, username, dob, gender, contact } = req.body;
    const existingUser = await User.findByPk(id)
    if (!existingUser) {
      return res.status(404).json({message: "Oops, User not found"})
    }
    const newDetails = {
      fullname: fullname ?? existingUser.fullname,
      username: username ?? existingUser.username,
      dob: dob ?? existingUser.dob,
      gender: gender ?? existingUser.gender,
      contact: contact ?? existingUser.contact
    }
    await existingUser.update(newDetails)

    // Optional: You can mutate the user details directly and save it, but using update() is more concise and cleaner
    /*
    existingUser.fullname = fullname ?? existingUser.fullname;
    existingUser.username = username ?? existingUser.username;
    existingUser.dob = dob ?? existingUser.dob;
    existingUser.gender = gender ?? existingUser.gender;
    existingUser.contact = contact ?? existingUser.contact;
    await existingUser.save();
    */
    return res.status(200).json({message: "User details updated successfully", newDetails})
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error"})
  }
}


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res. status(200).json({message: "Users fetched succesfully", users})
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//work on the getSingleUser controller and the route in the user.route.js

