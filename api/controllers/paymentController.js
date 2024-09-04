import catchAsyn from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
import process from "process";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session => api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyn(async (req, res) => {
  const { body } = req;

  // Create the session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/orders/me`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id?.toString(),
    mode: "payment",
    metadata: { ...body?.shippingInfo, itemsPrice: body?.itemsPrice },
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

  console.log(session);

  res.status(200).json({
    url: session.url,
  });
});
