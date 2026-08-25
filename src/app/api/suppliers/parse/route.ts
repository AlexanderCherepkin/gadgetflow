import { NextRequest, NextResponse } from "next/server";
import { parseSupplierFeed, ParsedProduct } from "@/lib/suppliers/feed-parser";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { supplierId, feedUrl, content, format = "yml" } = body;

    let xmlContent = content;

    // Fetch feed if URL provided
    if (!xmlContent && feedUrl) {
      const response = await fetch(feedUrl, { next: { revalidate: 0 } });
      if (!response.ok) {
        return NextResponse.json(
          { error: "Не удалось загрузить фид поставщика" },
          { status: 502 }
        );
      }
      xmlContent = await response.text();
    }

    if (!xmlContent) {
      return NextResponse.json(
        { error: "Необходимо указать content или feedUrl" },
        { status: 400 }
      );
    }

    const parsed: ParsedProduct[] = parseSupplierFeed(xmlContent, format);

    // Store raw + normalized in staging table
    const supabase = await createClient();
    const { error } = await supabase.from("supplier_feed_staging").insert({
      supplier_id: supplierId || "unknown",
      feed_url: feedUrl || null,
      raw_payload: xmlContent.slice(0, 100_000), // limit raw size
      normalized_payload: { products: parsed.slice(0, 1000), count: parsed.length },
      status: "parsed",
    });

    if (error) {
      console.error("Staging insert error:", error);
    }

    return NextResponse.json({
      success: true,
      count: parsed.length,
      sample: parsed.slice(0, 5),
    });
  } catch (error) {
    console.error("Supplier parse error:", error);
    return NextResponse.json(
      { error: "Ошибка обработки фида поставщика" },
      { status: 500 }
    );
  }
}
