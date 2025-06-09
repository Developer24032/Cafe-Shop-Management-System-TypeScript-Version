import User from '../../app/models/user';
import request from 'supertest';
import {disconnect} from 'mongoose';

const pass = 'password123';

function getRandomEmail() {
    return (
        Math.random().toString(36).substring(2, 8).toLowerCase() + '@gmail.com'
    );
}

afterAll(async () => {
    await disconnect();
})

describe('User API Tests', () => {
    afterAll(async () => {
        await User.deleteMany({});
    });
    describe('valid user registeration', () => {
        
    })
});