import { config } from "dotenv";
config({ path: ".env.local" });
import { getOrders, updateOrderStatus } from "../src/lib/supabase/orders";

async function main() {
  const orders = await getOrders();
  const order = orders[0];
  if (!order) {
    console.error("No orders found");
    process.exit(1);
  }

  console.log("Current status:", order.status, "for", order.order_number);

  const ok = await updateOrderStatus(order.id, "paid");
  if (!ok) {
    console.error("updateOrderStatus returned false");
    process.exit(1);
  }

  const updated = await getOrders();
  const found = updated.find((o) => o.id === order.id);
  console.log("New status:", found?.status);

  if (found?.status !== "paid") {
    console.error("Status did not change to paid");
    process.exit(1);
  }

  console.log("✅ Status change works");
}

main().catch((err) => {
  console.error("UNEXPECTED ERROR:", err);
  process.exit(1);
});
