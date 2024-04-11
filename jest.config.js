//<-----Jest가 테스트를 어떻게 실행할지를 구성하는 파일 ----->
/** @type {import('jest').Config} */
const config = {
    verbose : true,
    testEnvironment: "jsdom",
    setupFilesAfterEnv : ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: ['/node_modules/(?!(react-bootstrap-tagsinput)/)'],
};

module.exports = config;
