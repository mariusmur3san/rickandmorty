export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
};