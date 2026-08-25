import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "../src/lib/supabase/server-admin";

async function main() {
  const supabase = createAdminClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id")
    .ilike("order_number", "G-2026-%")
    .order("created_at", { ascending: false })
    .limit(10);

  if (!orders || orders.length === 0) {
    console.log("No recent test orders found.");
    return;
  }

  for (const order of orders) {
    await supabase.from("order_items").delete().eq("order_id", order.id);
    await supabase.from("orders").delete().eq("id", order.id);
    console.log("Deleted order", order.id);
  }

  const { data: customers } = await supabase
    .from("customers")
    .select("id")
    .ilike("email", "%test%@gadgetflow.by");

  if (customers) {
    for (const customer of customers) {
      await supabase.from("customers").delete().eq("id", customer.id);
      console.log("Deleted customer", customer.id);
    }
  }
}

main().catch((err) => {
  console.error("UNEXPECTED ERROR:", err);
  process.exit(1);
});
