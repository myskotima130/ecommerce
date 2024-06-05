import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function ProductPurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });

  if (!product) return notFound();

  const paymentIntend = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "usd",
    metadata: { productId: product.id },
  });

  if (paymentIntend.client_secret === null) {
    throw new Error("Stripe payment failed");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntend.client_secret}
    />
  );
}
