const { User } = require("../models/user");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");
const { mongo } = require("mongoose");

const router = require("express").Router();
// Route to get all users
router.get('/alluser', isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({_id:-1});
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
//Delete
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const deleteUsers = await User.findByIdAndDelete(req.params.id)
    res.status(200).send(deleteUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/stats",isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const users = await User.aggregate([
      {       //this all is aggegation like in sql we write query same concept but a little different 
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: { month: {$month: "$createdAt"} },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
