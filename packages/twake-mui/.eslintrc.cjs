module.exports = {
  extends: ['cozy-app/react'],
  rules: {
    'no-console': 1,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
}