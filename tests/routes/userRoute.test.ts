import User from '../../app/models/user';
import request from 'supertest';
import {disconnect} from 'mongoose';
import app from "../../app/app";

jest.mock('../../app/models/user');

const mockUser = {
    create: jest.fn().mockResolvedValue({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        phone_number: '',
        address: '',
        isActive: true,
    }),
    findOne: jest.fn().mockResolvedValue({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        username: '',
        phone_number: '',
        address: '',
        isActive: true,
    }),
    save: jest.fn().mockResolvedValue(true),
};

// Assign the mocked methods to the User model
(User as any).create = mockUser.create;
(User as any).findOne = mockUser.findOne;
(User as any).prototype.save = mockUser.save;

const pass = 'password123';

function getRandomEmail() {
    return (
        Math.random().toString(36).substring(2, 8).toLowerCase() + '@gmail.com'
    );
}

describe('User API Tests', () => {
    describe('Registration', () => {
        describe('valid registration', () => {
            test('user should have valid username, email, password, first name, and last name', async () => {
                const email = getRandomEmail();
                const response = await request(app).post('/api/users/register').send({
                    email: email,
                    username: 'testuser',
                    password: pass,
                    confirmPassword: pass,
                    firstName: 'Shoaib',
                    lastName: 'Nagy',
                });
                expect(response.statusCode).toBe(201);
                expect(response.body).toHaveProperty('message', 'User registered successfully');
                expect(response.body).toHaveProperty('user');
                expect(response.body.user).toHaveProperty('email', email);
                expect(response.body.user).toHaveProperty('username', 'testuser');
            });
        });
    });

    describe('Invalid Registration', () => {
        describe('invalid email', () => {
            test('should return 400 for invalid email format', async () => {
                const response = await request(app).post('/api/users/register').send({
                    email: 'invalid-email',
                    username: 'testuser',
                    password: pass,
                    confirmPassword: pass,
                    firstName: 'Shoaib',
                    lastName: 'Nagy',
                });
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty('message', 'Invalid email format');
            });
        });

        describe('password mismatch', () => {
            test('should return 400 for password and confirm password mismatch', async () => {
                const email = getRandomEmail();
                const response = await request(app).post('/api/users/register').send({
                    email: email,
                    username: 'testuser',
                    password: pass,
                    confirmPassword: 'differentPassword',
                    firstName: 'Shoaib',
                    lastName: 'Nagy',
                });
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty('message', 'Passwords do not match');
            });
        });

        describe('missing required fields', () => {
            test('should return 400 for missing required fields', async () => {
                const response = await request(app).post('/api/users/register').send({
                    email: getRandomEmail(),
                    username: '',
                    password: pass,
                    confirmPassword: pass,
                    firstName: '',
                    lastName: '',
                });
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty('message', 'Username, First name, and Last name are required');
            });
        });
    });
});

describe('Login', () => {
    describe('valid login', () => {
        test('should return 200 for valid email and password', async () => {
            const email = getRandomEmail();
            const response = await request(app).post('/api/users/login').send({
                email: email,
                password: pass,
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'User logged in successfully');
        });
    });
    describe('invalid login', () => {
        test('should return 400 for invalid email format', async () => {
            const response = await request(app).post('/api/users/login').send({
                email: 'invalid-email',
                password: pass,
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message', 'Invalid email format');
        });

        test('should return 400 for missing password', async () => {
            const response = await request(app).post('/api/users/login').send({
                email: getRandomEmail(),
                password: '',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message', 'Password is required');
        });

        test('should return 401 for incorrect credentials', async () => {
            const response = await request(app).post('/api/users/login').send({
                email: getRandomEmail(),
                password: 'wrongPassword',
            });
            expect(response.statusCode).toBe(401);
            expect(response.body).toHaveProperty('message', 'Invalid credentials');
        });
    });
});