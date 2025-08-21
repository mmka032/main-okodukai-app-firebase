// 支出用カテゴリUI
import { Utensils, ShoppingBag, Shirt, Train, MoreHorizontal } from "lucide-react";
import type { CatItem } from "./categoryMap";

export const ExpenseCategories: CatItem[] = [
  {
    label: "食費",
    icon: Utensils,
    bg: "var(--color-orange-bg)",
    ring: "var(--color-orange-main)",
  },
  {
    label: "日用品",
    icon: ShoppingBag,
    bg: "var(--color-green-bg)",
    ring: "var(--color-green-main)",
  },
  {
    label: "衣服",
    icon: Shirt,
    bg: "var(--color-pink-bg)",
    ring: "var(--color-pink-main)",
  },
  {
    label: "交通",
    icon: Train,
    bg: "var(--color-blue-bg)",
    ring: "var(--color-blue-main)",
  },
  {
    label: "その他",
    icon: MoreHorizontal,
    bg: "var(--color-other-bg)",
    ring: "var(--color-other-main)",
  },
];
