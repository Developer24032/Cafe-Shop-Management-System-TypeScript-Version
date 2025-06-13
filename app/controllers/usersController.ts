import { Request, Response } from "express";
import tryCatchBlock from "../middleware/tryCatchBlock";
import ApplicationError, {
  ApplicationErrorType,
} from "../utils/applicationError";
import User from "../models/user";

// This controller handles user-related operations such as adding, retrieving, updating, and deleting users.
const addNewUser = tryCatchBlock(async (req: Request, res: Response) => {
  const { username,
          password,
          email,
          firstName,
          lastName,
          phone_number,
          address,
          isActive } = req.body;
  if (!username || !password || !email || !firstName || !lastName || !phone_number || !address || isActive === undefined) {
    throw new ApplicationError({
      message: "All fields are required",
      type: ApplicationErrorType.VALIDATION_ERROR,
    });
  }

  const newUser = new User({
    username,
    password,
    email,
    firstName,
    lastName,
    phone_number,
    address,
    isActive,
  });

  await newUser.save();
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
    message: "User created successfully",
  });
});

const getUserById = tryCatchBlock(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("roleId");
  if (!user) {
    throw new ApplicationError({
      message: "User not found",
      type: ApplicationErrorType.NOT_FOUND,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
    message: "User retrieved successfully",
  });
});

const updateUser = tryCatchBlock(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
    if (!user) {
        throw new ApplicationError({
        message: "User not found",
        type: ApplicationErrorType.NOT_FOUND,
        });
  }
    res.status(200).json({
        status: "success",
        data: {
        user,
        },
        message: "User updated successfully",
    });
});

const deleteUser = tryCatchBlock(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApplicationError({
      message: "User not found",
      type: ApplicationErrorType.NOT_FOUND,
    });
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

export {
    addNewUser,
    getUserById,
    updateUser,
    deleteUser,
};
