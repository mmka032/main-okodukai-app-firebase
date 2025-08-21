// 最近の履歴（アイコン・タイ
import { ChevronRight } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

// 金額を日本円表示（関数）
const formatYen = (v: number) =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",            // 通貨形式で表示
    currency: "JPY",              // 日本円
    maximumFractionDigits: 0,     // 小数点以下は表示しない
  }).format(v);


// 表示するアイテム
type RecentItem = {
  id: string;                          // 各アイテムの一意識別子（オブジェクトなど、様々なものを区別するためのもの）
  title: string;                       // メインタイトル（サイゼリヤ・GU etc..）
  subtitle?: string;                   // サブタイトル（メモ）
  amount: number;                      // 金額
  type: "income" | "expense";          // 支出 / 収入（色分け用）
  icon?: ComponentType<LucideProps>;   // カテゴリアイコン
  bg?: string;                         // アイコン背景色
  ringColor?: string;                  // 選択時のリングの色 兼 アイコンの色
};


type Props = {
  items?: RecentItem[];                     // 表示するアイテム配列                  
  onItemClick?: (it: RecentItem) => void;   // アイテムクリック時
};


// UI (定義したPropsを代入)
export default function RecentHistory({
  items = [],         // 表示する履歴リスト（デフォルトは空配列）
  onItemClick,        // ボタンなどを押したときに関数を呼び出す
}: Props) {
  return (
    <section
      aria-label="最近の履歴"
      className="p-[30px_20px] bg-white rounded-[10px] border border-[var(--color-meter-border)] shadow-[var(--color-shadow)] mt-17.5"
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">最近の履歴</h3>
            <ChevronRight size={20} />
      </div>

      {/* リスト */}
      <ul role="list" className="divide-y divide-[var(--color-meter-border)]">
        {items.map((it, idx) => (
          <li
            key={idx}
            className="py-[25px] flex items-center gap-4 last:pb-0 rounded-[10px] cursor-pointer"
            onClick={() => onItemClick?.(it)} 
          >
            {/* アイコン丸 */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: it.bg || "var(--color-meter-bg)" }}
            >
            {it.icon && (
              <it.icon className="w-6 h-6" color={it.ringColor} />
            )}
            </div>

            {/* タイトル・サブ */}
            <div className="flex-1 ">
              <div className="font-bold">{it.title}</div>
              {it.subtitle && (
                <div className="text-xs text-[var(--color-text-sub)]">
                  {it.subtitle}
                </div>
              )}
            </div>

            {/* 金額 */}
            <div
              className="text-xl font-bold"
              style={{
                color:
                  it.type === "income"
                    ? "var(--color-main)"
                    : "var(--color-text-main)",
                fontFamily: "var(--font-number)",
              }}
            >
              {formatYen(it.amount)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
