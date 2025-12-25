
import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripePayment,
} from "../controllers/orderController.js";
import authUser from "../middleware/Auth.js";
import adminAuth  from "../middleware/adminAuth.js"

const orderRouter = express.Router();
// admin feature
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
// payment feature
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay",authUser, placeOrderRazorpay);

// user
orderRouter.post("/userorders", authUser, userOrders);

//verify payment
orderRouter.post("/verifystripe", authUser, verifyStripePayment);

export default orderRouter;
