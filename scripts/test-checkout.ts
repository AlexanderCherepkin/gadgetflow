import { config } from "dotenv";
config({ path: ".env.local" });
import { createOrder } from "../src/lib/supabase/orders";
import { getOrders } from "../src/lib/supabase/orders";

async function main() {
  const order = await createOrder({
    customer: {
      email: "test-script@gadgetflow.by",
      phone: "+375 (29) 123-45-67",
      full_name: "Тестовый Клиент (script)",
      address: "ул. Ленина, 10, кв. 5, 246000",
      city: "Гомель",
    },
    items: [
      {
        product_id: "p1",
        product_name: "Apple iPhone 15 128 GB",
        quantity: 2,
        price_byn: 82990,
        total_byn: 165980,
        metadata: { variant: "Чёрный / 128 ГБ" },
      },
    ],
    total_byn: 165980,
    delivery_cost_byn: 0,
    delivery_method: "Минск — курьер",
    payment_method: "erip",
    currency: "BYN",
  });

  if (!order) {
    console.error("FAIL: createOrder returned null");
    process.exit(1);
  }

  console.log("Created order:", order.order_number, "total:", order.total_byn);

  const orders = await getOrders();
  const found = orders.find((o) => o.id === order.id);

  if (!found) {
    console.error("FAIL: order not found in getOrders()");
    process.exit(1);
  }

  console.log("Verified in admin list:", found.order_number, found.customer?.full_name);
  console.log("Items:", found.items?.map((i) => `${i.quantity} × ${i.product_name}`).join(", "));
}

main().catch((err) => {
  console.error("UNEXPECTED ERROR:", err);
  process.exit(1);
});
