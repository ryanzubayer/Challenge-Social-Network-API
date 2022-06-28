const router = require("express").Router();
const {
	getAllThoughts,
	getthoughtById,
	createThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../controllers/thoughts-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router
	.route("/:id")
	.get(getthoughtById)
	.put(updateThought)
	.delete(deleteThought);

//	/api/thoughts/:id/reactions
router.route("/:id/reactions").post(createReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
