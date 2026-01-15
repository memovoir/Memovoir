import { ReactNode } from "react";
import { headers } from "next/headers";
import { getThemeById } from "@/themes/themes";
import { ThemeWrapper } from "@/components/ThemeWrapper";

export default async function WallLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { wall_id: string };
}) {
  const headersList = headers();
  const host = headersList.get("host");

  if (!host) return <>{children}</>;

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/walls/${params.wall_id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return <>{children}</>;

  const wall = await res.json();
  const theme = getThemeById(wall.theme);

  return <ThemeWrapper theme={theme}>{children}</ThemeWrapper>;
}
