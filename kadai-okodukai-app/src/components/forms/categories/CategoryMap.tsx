// カテゴリアイコンの集約
// 複数画面で「ラベル→アイコン/色」を逆引きするために作ったファイル
import { ExpenseCategories } from "./ExpenseCategories";
import { IncomeCategories } from "./IncomeCategories";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

// 共通のカテゴリ型
export type CatItem = {
  label: string;                     // カテゴリ名（食費・交通 etc...）
  icon: ComponentType<LucideProps>;  // コンポーネント型
  bg: string;                        // 背景色
  ring?: string;                     // 選択時のリングの色 兼 アイコンの色
};

// カテゴリ名（label）でアイコンや色にアクセスできる辞書を作成
// 支出カテゴリと収入カテゴリをまとめて一つのオブジェクトにする
export const categoryMap: Record<string, Omit<CatItem, "label">> =
  Object.fromEntries(
    // 支出と収入の配列を結合
    [...ExpenseCategories, ...IncomeCategories]
    // 配列を [キー, 値] の形式に変換
    .map((c) => [
      c.label,                                  // キーはカテゴリ名
      { icon: c.icon, bg: c.bg, ring: c.ring }, // 値はアイコン・背景・リング
    ])
  );
