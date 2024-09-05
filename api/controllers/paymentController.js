import catchAsyn from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
import process from "process";
import Order from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session => api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyn(async (req, res) => {
  const { body } = req;
  const shippingInfo = body?.shippingInfo;

  // Create the session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/orders/me`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id?.toString(),
    mode: "payment",
    metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
    shipping_options: [
      {
        shipping_rate:
          body?.itemsPrice > 200
            ? process.env.STRIPE_FREE_SHIPPING
            : process.env.STRIPE_GROUND_SHIPPING,
      },
    ],
    line_items: body?.orderItems?.map((item) => ({
      tax_rates: [process.env.STRIPE_TAX_RATE_ID],
      quantity: item?.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item?.price * 100,
        product_data: {
          name: item?.name,
          images: [item?.image],
          metadata: {
            productId: item?.product,
          },
        },
      },
    })),
  });

  res.status(200).json({
    url: session.url,
  });
});

// Create new order after payment => api/v1/payment/webhook
export const stripeWebhook = catchAsyn(async (req, res, next) => {
  try {
    const signature = req?.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req?.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      const orderItems = await getOrderItems(line_items);
      console.log("Order Items=>", orderItems);
      const user = session.client_reference_id;
      const totalAmount = session.amount_total / 100.0;
      const taxAmount = session.total_details.amount_tax / 100.0;
      const shippingAmount = session.total_details.amount_shipping / 100.0;
      const itemsPrice = session.metadata.itemsPrice;
      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNo: session.metadata.phoneNo,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        orderItems,
        user,
        totalAmount,
        taxAmount,
        shippingAmount,
        itemsPrice,
        shippingInfo,
        paymentInfo,
        paymentMethod: "Card",
      };
      console.log(orderData);
      await Order.create(orderData);
      res.status(200).json({ success: true });
    }
    next();
  } catch (error) {
    console.log("error: ", error);
  }
});

const getOrderItems = async (line_items) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // Use map to create an array of promises
      const cartItemsPromises = line_items.data.map(async (item) => {
        const product = await stripe.products.retrieve(item.price.product);
        const { productId } = product.metadata;
        return {
          product: productId,
          name: product?.name,
          price: item.price.unit_amount_decimal / 100,
          quantity: item.quantity,
          image: product.images[0],
        };
      });

      // Use Promise.all to wait for all promises to resolve
      const cartItems = await Promise.all(cartItemsPromises);

      // Resolve the promise with the cartItems
      resolve(cartItems);
    } catch (error) {
      console.log("Error retrieving cart items", error);
      reject(error);
    }
  });
};
