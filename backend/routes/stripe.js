require("dotenv").config();

const express = require("express");
const { User } = require("../models/user");
const { Order } = require("../models/order");
const { Console } = require("console");
const stripe = require("stripe")(process.env.STRIPE_KEY);
// Make sure to replace 'your_stripe_secret_key' with your actual Stripe Secret Key.

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      
    },
  });
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image.url],
          description: item.desc,
          metadata: {
            id: item.id,
          }, //optional
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE", "PK", "IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

const createOrder = async(customer,data,lineItems)=>{

  const newOrder = new Order({
    userId:customer.metadata.userId,
    customerId:data.customer,
    payment_IntentId:data.payment_intent,
    products:lineItems.data,
    subtotal:data.amount_subtotal,
    total:data.amount_total,
    shipping:data.customer_details,
    payment_status:data.payment_status,
  });
  try{
    const saveOrder = await newOrder.save();
    console.log("processed Ordder",saveOrder)
  }catch(err){
    console.log(err);
  }
}


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret ;

// endpointSecret="whsec_5eb754c0603adac7b6710de3c90d74d0efa57e42a8368ef9e43748ef4ff29efa";


const rawBodyMiddleware = (req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] === "application/json") {
      req.rawBody = "";
      req.setEncoding("utf8");
  
      req.on("data", (chunk) => {
        req.rawBody += chunk;
      });
  
      req.on("end", () => {
        next();
      });
    } else {
      next();
    }
  };

router.post(
  "/webhook",
  rawBodyMiddleware,
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          endpointSecret
        );
        console.log("webhook verified");
      } catch (err) {
        console.log("webhook error",err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      //there are more events in stripe yuo can explore them
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
         stripe.checkout.sessions.listLineItems(
          data.id,
          {},
          function(err,lineItems){
                   console.log("line_items",lineItems)
                   createOrder(customer,data,lineItems);
          }
         );
          
        })
        .catch((err) => console.log(err.message));
    }
    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
