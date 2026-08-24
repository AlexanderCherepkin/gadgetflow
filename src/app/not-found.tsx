import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-accent mb-4">404</h1>
      <p className="text-xl md:text-2xl font-semibold mb-2">Страница не найдена</p>
      <p className="text-text-secondary mb-8 max-w-md">
        Запрашиваемая страница не существует или была удалена.
      </p>
      <Button asChild>
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
}
