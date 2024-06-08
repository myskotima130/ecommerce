"use server";

import db from "@/db/db";
import { OrderInformation } from "@/email/components/OrderInformation";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email();
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const resolt = emailSchema.safeParse(formData.get("email"));

  if (resolt.success === false) return { error: resolt.error.message };

  const user = await db.user.findUnique({
    where: { email: resolt.data },
    select: {
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!user) return { error: "Check your email to view your order history" };

  const orders = user.orders.map((order) => ({
    ...order,
    downloadVerificationId: db.downloadVerification.create({
      data: {
        expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
        productId: order.product.id,
      },
    }),
  }));

  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: "Your order history",
    react: <OrderHistoryEmail />,
  });

  if (data.error)
    return {
      error: "Your order history could not be sent, please try again later",
    };

  return { message: "Check your email to view your order history" };
}
