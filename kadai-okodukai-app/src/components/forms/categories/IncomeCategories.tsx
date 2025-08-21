// 収入用カテゴリUI
import { Briefcase, Gift, MoreHorizontal } from "lucide-react";
import type { CatItem } from "./categoryMap";

export const IncomeCategories: CatItem[] = [
  {
    label: "バイト",
    icon: Briefcase,
    bg: "var(--color-job-bg)",
    ring: "var(--color-job-main)",
  },
  {
    label: "臨時収入",
    icon: Gift,
    bg: "var(--color-extra-bg)",
    ring: "var(--color-extra-main)",
  },
  {
    label: "その他",
    icon: MoreHorizontal,
    bg: "var(--color-other-bg)",
    ring: "var(--color-other-main)",
  },
];
