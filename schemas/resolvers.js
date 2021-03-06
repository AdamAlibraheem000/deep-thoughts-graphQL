const {User, Thought} = require('../models')

const resolvers = {
    Query: {
        // Find all thoughts
        thoughts: async (parent, {username}) => {
            const params = username? {username} : {};
            return Thought.find(params).sort({createdAt: -1});
        },

        // Find one thought by ID
        thought: async (parent, {_id}) => {
            return Thought.findOne({_id});
        },

        // Get all users
        users: async () => {
            return User.find()
            .select('-__v -password')  //Do not return version number or password
            .populate('friends')
            .populate('thoughts');
        },

        // Get user by username
        user: async (parent, {username}) => {
            return User.findOne({username})
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        }
        }
    }


module.exports = resolvers;