const nameRegex = /^[a-zA-Z\s]{3,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{6,}$/;
const idRegex = /^\d+$/;

const userValidator = {
  name: async (name) => {
    if (!nameRegex.test( name )) {
      throw new Error( 'Name must be between 3 and 30 characters and contain only letters and spaces.' );
    }
  },
  email: async (email) => {
    if (!emailRegex.test( email )) {
      throw new Error( 'Invalid email format.' );
    }
  },
  password: async (password) => {
    if (!passwordRegex.test( password )) {
      throw new Error( 'Password must be at least 6 characters long.' );
    }
  },
  id: async (userId) => {
    if (!idRegex.test( userId )) {
      throw new Error( 'ID is not valid.' );
    }
  },
  index: async (index) => {
    if (index === -1) {
      throw new Error( 'User not found.' );
    }
  }
};

module.exports = {
  userValidator
};