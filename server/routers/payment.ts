import z from "zod";
import { publicProcedure, router } from "../trpc";
import crypto from "crypto";

export const paymentRouter = router({
  initiateEsewaPayment: publicProcedure
    .input(
      z.object({
        amount: z.string(), // e.g., "110.00"
        transactionId: z.string(), // e.g., "TXN-123456789"
        productCode: z.string(), // e.g., "EPAYTEST"
      })
    )
    .mutation(({ input }) => {
      const total_amount = input.amount;
      const transaction_uuid = input.transactionId;
      const product_code = input.productCode;

      const tax_amount = "0";
      const product_service_charge = "0";
      const product_delivery_charge = "0";

      const success_url = `${process.env.NEXT_PUBLIC_BASE_URL}/success`;
      const failure_url = `${process.env.NEXT_PUBLIC_BASE_URL}/failure`;

      const signed_field_names = [
        "total_amount",
        "transaction_uuid",
        "product_code",
      ];

      // Create a plain object with keys matching signed_field_names
      const signData: Record<string, string> = {
        total_amount,
        transaction_uuid,
        product_code,
      };

      const signString = signed_field_names
        .map((field) => `${field}=${signData[field]}`)
        .join(",");

      const signature = crypto
        .createHmac("sha256", process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY!)
        .update(signString)
        .digest("base64");

      return {
        esewaConfig: {
          amount: total_amount,
          tax_amount,
          total_amount,
          transaction_uuid,
          product_code,
          product_service_charge,
          product_delivery_charge,
          success_url,
          failure_url,
          signed_field_names: signed_field_names.join(","),
          signature,
        },
      };
    }),
});
