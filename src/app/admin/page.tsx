import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getOrders, updateOrderStatus } from "@/lib/supabase/orders";
import { OrderWithItems, OrderStatus } from "@/lib/types/order";
import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Ожидает",
  confirmed: "Подтверждён",
  paid: "Оплачен",
  processing: "В обработке",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменён",
  refunded: "Возврат",
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-orange-100 text-orange-800",
};

export const metadata = {
  title: "Админ-панель",
};

export default async function AdminPage() {
  const orders = await getOrders();

  async function setStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as OrderStatus;
    await updateOrderStatus(id, status);
    revalidatePath("/admin");
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Админ-панель GadgetFlow</h1>

          <div className="bg-surface rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Заказы ({orders.length})</h2>

            {orders.length === 0 ? (
              <p className="text-text-secondary">Заказов пока нет.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order: OrderWithItems) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-2xl p-5 bg-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{order.order_number}</span>
                          <Badge className={statusColors[order.status]}>
                            {statusLabels[order.status]}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {order.customer?.full_name || "—"} ·{" "}
                          {order.customer?.phone || "—"} ·{" "}
                          {new Date(order.created_at).toLocaleString("ru-BY")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold"><Price value={order.total_byn} /></p>
                        <p className="text-xs text-text-secondary">{order.delivery_method}</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 mb-4">
                      <p className="text-sm font-medium mb-2">Товары:</p>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        {order.items?.map((item) => (
                          <li key={item.id}>
                            {item.quantity} × {item.product_name} —{" "}
                            <Price value={item.total_byn} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-text-secondary">Сменить статус:</span>
                      {(
                        [
                          "pending",
                          "confirmed",
                          "paid",
                          "processing",
                          "shipped",
                          "delivered",
                          "cancelled",
                          "refunded",
                        ] as OrderStatus[]
                      ).map((status) => (
                        <form key={status} action={setStatus}>
                          <input type="hidden" name="id" value={order.id} />
                          <input type="hidden" name="status" value={status} />
                          <Button
                            type="submit"
                            variant={order.status === status ? "default" : "outline"}
                            size="sm"
                          >
                            {statusLabels[status]}
                          </Button>
                        </form>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Быстрые ссылки</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="text-accent hover:underline">Главная</Link>
              <Link href="/catalog/smartfony" className="text-accent hover:underline">Каталог</Link>
              <Link href="/checkout" className="text-accent hover:underline">Оформление заказа</Link>
              <Link href="/terms" className="text-accent hover:underline">Оферта</Link>
              <Link href="/returns" className="text-accent hover:underline">Возврат</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
