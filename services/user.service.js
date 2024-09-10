const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const { urls, baseURL } = require('../constants/urls');

const userService = {
  get: async () => {
    const users = await readFile(join(baseURL, urls.users.base), {encoding: 'utf-8'});
    return JSON.parse(users);
  },
  getById: async (userId) => {
    const users = await userService.get();
      return users.find( user => user.id === userId );
  },
  findIndex: async (userId) => {
    const users = await userService.get();
      return users.findIndex( user => user.id === userId );
  },
  post: async (users) => {
    await writeFile(join(baseURL, urls.users.base), JSON.stringify(users));
  }
};

module.exports = {
  userService
};