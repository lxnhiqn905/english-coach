"use client";

import EssentialUnitPage from "@/components/EssentialUnitPage";
import { BOOKS } from "@/lib/data/essentialBooks";

export default function Essential1UnitPage() {
  return <EssentialUnitPage book={BOOKS[1]} />;
}
