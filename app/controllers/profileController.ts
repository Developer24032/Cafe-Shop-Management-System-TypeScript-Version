import {Request, Response} from 'express';
import ApplicationError, {ApplicationErrorType} from '../utils/applicationError';
import tryCatchBlock from '../middleware/tryCatchBlock'
import Profile from '../models/profile';
// function addNewProfileData(req: Request): void {
    
// }
const addNewProfile = tryCatchBlock(async (req: Request, res: Response): Promise<void> => {
    const {first_name, last_name, age, gender, phone_number} = req.body;
    if (!first_name || !last_name || !age || !gender || !phone_number) {
        throw new ApplicationError({
            message: 'All fields are required',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }
    const newProfile = new Profile({
        first_name,
        last_name,
        age,
        gender,
        phone_number
    });

    await newProfile.save();
    res.status(201).json({
        status: 'success',
        data: {
            profile: newProfile,
        },
        message: 'Profile created successfully',
    });
});

const getAllProfiles = tryCatchBlock(async (req: Request, res: Response) => {
    const profiles = await Profile.find();
    if (!profiles || profiles.length === 0) {
        throw new ApplicationError({
            message: 'No profiles found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            profiles,
        },
        message: 'Profiles retrieved successfully',
    });
});

const getProfileById = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
        throw new ApplicationError({
            message: 'Profile not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
        message: 'Profile retrieved successfully',
    });
});

const updateProfile = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const {first_name, last_name, age, gender, phone_number} = req.body;
    const profile = await Profile.findByIdAndUpdate(id, {
        first_name,
        last_name,
        age,
        gender,
        phone_number
    });
    if (!profile) {
        throw new ApplicationError({
            message: 'Profile not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
        message: 'Profile updated successfully',
    });
});

const deleteProfile = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
        throw new ApplicationError({
            message: 'Profile not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Profile deleted successfully',
    });
});

export {
    addNewProfile,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile
};
