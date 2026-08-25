export type OrderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "authorized"
  | "paid"
  | "failed"
  | "refunded"
  | "cancelled";

export type DeliveryStatus =
  | "pending"
  | "ready"
  | "handed_over"
  | "in_transit"
  | "delivered"
  | "returned";

export interface Customer {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  address: string | null;
  city: string | null;
  created_at: string;
}

export interface OrderItemInput {
  product_id?: string;
  product_name: string;
  quantity: number;
  price_byn: number;
  total_byn: number;
  metadata?: Record<string, unknown>;
}

export interface OrderItem extends OrderItemInput {
  id: string;
  order_id: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  delivery_status: DeliveryStatus;
  currency: string;
  total_byn: number;
  delivery_cost_byn: number;
  discount_byn: number;
  delivery_method: string | null;
  payment_method: string | null;
  delivery_address: string | null;
  delivery_city: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  provider: string;
  provider_payment_id: string | null;
  amount_byn: number;
  status: PaymentStatus;
  payload: Record<string, unknown>;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Delivery {
  id: string;
  order_id: string;
  carrier: string;
  tracking_number: string | null;
  status: DeliveryStatus;
  estimated_days: number | null;
  cost_byn: number | null;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
  customer?: Customer | null;
}
