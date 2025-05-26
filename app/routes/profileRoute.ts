import {Router, Request, Response, NextFunction} from 'express';
import {addNewProfile, getAllProfiles, getProfileById, updateProfile, deleteProfile} from '../controllers/profileController';

const router = Router();
router.post('/profile/new-profile', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const profile = await addNewProfile(req.body);
        res.status(201).json(profile);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile/all-profiles', async (req: Request, res: Response): Promise<void> => {
    try {
        const profiles = await getAllProfiles(req);
        res.status(200).json(profiles);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await getProfileById(req.params.id);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/profile/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedProfile = await updateProfile(req.params.id, req.body);
        if (updatedProfile) {
            res.status(200).json(updatedProfile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/profile/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedProfile = await deleteProfile(req.params.id);
        if (deletedProfile) {
            res.status(200).json({ message: 'Profile deleted successfully' });
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});