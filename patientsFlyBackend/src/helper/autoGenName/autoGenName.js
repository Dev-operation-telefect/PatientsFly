import User from '../../models/users/userModel.js'; // path to the UserUser model
// Utility function to generate a unique username with error handling
export const generateUniqueUsername = async (firstName, lastName) => {
  try {
    let baseUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    let username = baseUsername;
    let counter = 1;

    while (await User.findOne({ 'personal.username': username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  } catch (error) {
    console.error('Error generating unique username:', error);
    throw new Error('Failed to generate unique username');
  }
};
