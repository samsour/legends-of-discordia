import dotenv from 'dotenv';

// make env file variables known to jest
dotenv.config();

export default {
    testEnvironment: 'jest-environment-node',
    transform: {},
};
