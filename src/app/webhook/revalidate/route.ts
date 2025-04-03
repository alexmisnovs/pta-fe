import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, entry } = body;

    const token = request.headers.get("Authorization");
    // console.log("Received token:", token);
    // console.log("Expected token:", `Bearer ${process.env.REVALIDATE_TOKEN}`);
    // console.log("Environment variable:", process.env.REVALIDATE_TOKEN);

    // Check for token with or without Bearer prefix
    if (
      token !== `Bearer ${process.env.REVALIDATE_TOKEN}` &&
      token !== process.env.REVALIDATE_TOKEN
    ) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    switch (model) {
      case "article":
        revalidatePath("/news");
        revalidatePath(`/news/${entry.slug}`);
        revalidatePath("/");
        break;
      case "event":
        revalidatePath("/events");
        revalidatePath(`/events/${entry.slug}`);
        revalidatePath("/");
        break;
      case "project":
        revalidatePath("/projects");
        revalidatePath(`/projects/${entry.slug}`);
        revalidatePath("/");
        break;
      case "product":
        revalidatePath("/products");
        revalidatePath(`/products/${entry.slug}`);
        break;
      case "home-page-content":
        revalidatePath("/");
        break;
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: err }, { status: 500 });
  }
}
