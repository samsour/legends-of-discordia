import dotenv from 'dotenv';

// make env file variables known to jest
dotenv.config();

export default {
    testEnvironment: 'jest-environment-node',
    transform: {},
    coverageReporters: ['json', 'text'],
    modulePathIgnorePatterns: ['__mocks__'],
    coverageThreshold: {
        global: {
            branches: 77.27,
            functions: 73.68,
            lines: 91.01,
        },
    },
};
