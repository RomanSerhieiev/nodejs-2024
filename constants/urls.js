const baseURL = process.cwd();

const users = 'db/users.db.json';

const urls = {
  users: {
    base: users
  }
};

module.exports = {
  baseURL,
  urls
};