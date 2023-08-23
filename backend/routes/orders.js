const { Order, User } = require("../models/order");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");
const { mongo } = require("mongoose");
const express = require("express");
const router = express.Router();

//get latest orders
router.get("/", isAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const order = query
      ? await Order.find().sort({ _id: -1 }).limit(4)
      : await Order.find().sort({ _id: -1 });

    res.status(200).send(order);
  } catch (err) {}
});

//getting all orders:
router.get("/allorders", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//update ORDERS
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updateOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});
//Get AN Order by id
router.get("/findOne/:id", isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    // console.log(req.user);
    // console.log(order);
    if (req.user.id !== order.userId || !req.user.isAdmin) {
      return res.status(403).send("Access denied. Not auhtorized...");
    }

    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

//getting user of one month
router.get("/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const orders = await Order.aggregate([
      {
        //this all is aggegation like in sql we write query same concept but a little different
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// get income in total
router.get("/income/alltime", isAdmin, async (req, res) => {
  try {
    const income = await Order.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).send(income);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//get income stats of current month
router.get("/income/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const income = await Order.aggregate([
      {
        //this all is aggegation like in sql we write query same concept but a little different
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).send(income);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
// get i week sales
router.get("/week-sales", isAdmin, async (req, res) => {
  const last7Days = moment()
    .day(moment().day() - 7)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const orders = await Order.aggregate([
      {
        //this all is aggegation like in sql we write query same concept but a little different
        $match: { createdAt: { $gte: new Date(last7Days) } },
      },
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$day",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
