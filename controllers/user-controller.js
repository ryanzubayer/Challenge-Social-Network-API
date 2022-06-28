const { User } = require("../models");

const userController = {
	// get all users
	// /api/users
	getAllUsers(req, res) {
		User.find({})
			.select("-__v")
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				console.log(err);
				res.json(err);
			});
	},

	// get one user by ID
	// /api/users/:id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				console.log(err);
				res.json(err);
			});
	},

	// create a new user
	// /api/users
	createUser({ body }, res) {
		User.create(body)
			.then(dbUserData => res.json(dbUserData))
			.catch(err => res.json(err));
	},

	// update a user by it's ID
	// /api/users/:id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));
	},

	// delete a user by it's ID
	// /api/users/:id
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then(dbUserData => res.json(dbUserData))
			.catch(err => res.json(err));
	},

	// add a friend to users friend list
	// /api/users/:id/friends/:friendsId
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{ $addToSet: { friends: params.friendsId } },
			{ new: true }
		)
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));
	},

	// delete a friend from a users friend list
	deleteFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{ $pull: { friends: params.friendsId } },
			{ new: true }
		)
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));
	},
};

module.exports = userController;
