"use server";

import { createClient } from "./server";
import { createAdminClient } from "./server-admin";
import { OrderWithItems, OrderItemInput, OrderStatus } from "@/lib/types/order";

async function getOrderClient() {
  try {
    return createAdminClient();
  } catch {
    return createClient();
  }
}

function logError(context: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`${context}:`, error.message);
  } else if (error && typeof error === "object" && "message" in error) {
    console.error(`${context}:`, (error as { message: string }).message);
  } else {
    console.error(`${context}:`, JSON.stringify(error));
  }
}

export async function generateOrderNumber(): Promise<string> {
  const supabase = await getOrderClient();
  const date = new Date();
  const prefix = `G-${date.getFullYear()}`;
  const { count, error } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", date.toISOString().slice(0, 10));

  if (error) {
    logError("Generate order number error", error);
  }

  const sequence = (count ?? 0) + 1;
  return `${prefix}-${String(sequence).padStart(6, "0")}`;
}

export async function createOrder(params: {
  customer: {
    email: string;
    phone: string;
    full_name: string;
    address: string;
    city: string;
  };
  items: OrderItemInput[];
  total_byn: number;
  delivery_cost_byn: number;
  delivery_method: string;
  payment_method: string;
  currency: string;
  notes?: string;
}): Promise<OrderWithItems | null> {
  try {
    const supabase = await getOrderClient();

    // 1. Find or create customer by email (avoids requiring a unique index on email)
    let customerId: string | null = null;
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", params.customer.email)
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      const { error: updateError } = await supabase
        .from("customers")
        .update({
          phone: params.customer.phone,
          full_name: params.customer.full_name,
          address: params.customer.address,
          city: params.customer.city,
        })
        .eq("id", customerId);

      if (updateError) {
        logError("Customer update error", updateError);
        return null;
      }
    } else {
      const { data: newCustomer, error: insertError } = await supabase
        .from("customers")
        .insert({
          email: params.customer.email,
          phone: params.customer.phone,
          full_name: params.customer.full_name,
          address: params.customer.address,
          city: params.customer.city,
        })
        .select()
        .single();

      if (insertError || !newCustomer) {
        logError("Customer insert error", insertError);
        return null;
      }
      customerId = newCustomer.id;
    }

    // 2. Create order
    const orderNumber = await generateOrderNumber();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        status: "pending",
        payment_status: "pending",
        delivery_status: "pending",
        currency: params.currency,
        total_byn: params.total_byn,
        delivery_cost_byn: params.delivery_cost_byn,
        delivery_method: params.delivery_method,
        payment_method: params.payment_method,
        delivery_address: params.customer.address,
        delivery_city: params.customer.city,
        notes: params.notes ?? null,
      })
      .select()
      .single();

    if (orderError || !order) {
      logError("Order insert error", orderError);
      return null;
    }

    // 3. Insert order items
    // In MVP product IDs come from the static catalog and may not be valid UUIDs.
    // If the schema still uses UUID for product_id, pass null to avoid insert errors.
    const isUuid = (value: string | undefined): boolean => {
      if (!value) return false;
      return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        value
      );
    };

    const { error: itemsError } = await supabase.from("order_items").insert(
      params.items.map((item) => ({
        order_id: order.id,
        product_id: isUuid(item.product_id) ? item.product_id : null,
        product_name: item.product_name,
        quantity: item.quantity,
        price_byn: item.price_byn,
        total_byn: item.total_byn,
        metadata: item.metadata ?? {},
      }))
    );

    if (itemsError) {
      logError("Order items insert error", itemsError);
      return null;
    }

    const { data: customer } = await supabase
      .from("customers")
      .select("*")
      .eq("id", customerId)
      .single();

    return {
      ...order,
      items: params.items.map((item) => ({
        ...item,
        id: "",
        order_id: order.id,
      })),
      customer: customer ?? undefined,
    };
  } catch (error) {
    logError("Create order unexpected error", error);
    return null;
  }
}

export async function getOrders(status?: OrderStatus): Promise<OrderWithItems[]> {
  const supabase = await getOrderClient();
  let query = supabase
    .from("orders")
    .select("*, items:order_items(*), customer:customers(*)")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    logError("Get orders error", error);
    return [];
  }

  return data ?? [];
}

export async function getOrderById(id: string): Promise<OrderWithItems | null> {
  const supabase = await getOrderClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, items:order_items(*), customer:customers(*)")
    .eq("id", id)
    .single();

  if (error) {
    logError("Get order error", error);
    return null;
  }

  return data;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<boolean> {
  const supabase = await getOrderClient();
  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    logError("Update order status error", error);
    return false;
  }

  return true;
}
