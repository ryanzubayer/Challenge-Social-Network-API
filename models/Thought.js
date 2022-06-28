const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal),
		},
		username: {
			type: String,
			require: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	}
);

ThoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtSchema);

module.exports = Thoughts;
