"use client";
import EssentialListPage from "@/components/EssentialListPage";
import { BOOKS } from "@/lib/data/essentialBooks";
export default function Essential5Page() { return <EssentialListPage book={BOOKS[5]} />; }
