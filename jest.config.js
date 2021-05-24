import dotenv from 'dotenv';

// make env file variables known to jest
dotenv.config();

export default {
    testEnvironment: 'jest-environment-node',
    transform: {},
    coverageReporters: ['json', 'text'],
    modulePathIgnorePatterns: ['__mocks__'],
    // coverageThreshold: {
    //     global: {
    //         branches: 100,
    //         functions: 100,
    //         lines: 100,
    //     }
    // }
};
