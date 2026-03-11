"use client";

import EssentialUnitPage from "@/components/EssentialUnitPage";
import { BOOKS } from "@/lib/data/essentialBooks";

export default function Essential2UnitPage() {
  return <EssentialUnitPage book={BOOKS[2]} />;
}
