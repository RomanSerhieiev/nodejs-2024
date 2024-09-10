const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const { urls, baseURL } = require('../constants/urls');

const userService = {
  getAll: async () => {
    const users = await readFile(join(baseURL, urls.users.base), {encoding: 'utf-8'});
    return JSON.parse(users);
  },
  getById: async (userId) => {
    const users = await userService.getAll();
      return users.find( user => user.id === userId );
  },
  getIndexById: async (userId) => {
    const users = await userService.getAll();
      return users.findIndex( user => user.id === userId );
  },
  updateAll: async (users) => {
    await writeFile(join(baseURL, urls.users.base), JSON.stringify(users));
  }
};

module.exports = {
  userService
};