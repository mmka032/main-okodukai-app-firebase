// 支出 / 収入棒グラフ（カテゴリ別）
import { ExpenseCategories } from "../../forms/categories/ExpenseCategories";
import { IncomeCategories } from "../../forms/categories/IncomeCategories";
import type { RiType } from "../../TabSwitch";
import { motion } from "framer-motion";

// コンポーネントの Props 定義
type CategoryBarChartProps = {
  type: RiType;                      
  totals?: Record<string, number>;   // 各カテゴリの合計金額 ( "食費": 5000, "交通": 2000 etc... ) 
  max?: number;                      // 棒グラフの最大基準値() 50000円 )
};

export default function CategoryBarChart({ type, totals = {}, max }: CategoryBarChartProps) {
  const categories = type === "expense" ? ExpenseCategories : IncomeCategories;

  // 最大金額（バーの比率用）
  // totals の中で一番大きい金額を自動で取得
  const autoMax = Math.max(...Object.values(totals), 1);

  // 手動で max が指定されている場合は優先、それでなければ autoMax を使用
  const maxAmount = max ?? autoMax;

  return (
    // 2列のグリッドでカテゴリを並べる
    <div className="grid grid-cols-2 gap-x-6.5 gap-y-10 mt-15">
      {categories.map((cat) => {

        // totals からそのカテゴリの金額を取得（なければ0）
        const amount = totals[cat.label] || 0;

        // 棒グラフの長さ（％計算）
        const widthPercent = (amount / maxAmount) * 100;

        return (
          <div key={cat.label} className="w-40.5 h-14 flex flex-col justify-between">

            {/* 上段: アイコン + 金額 */}
            <div className="flex items-center justify-between">

              {/* 左側：カテゴリアイコン（背景色付き円形） */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: cat.bg }}
              >

                {/* アイコンの色は cat.ring */}
                <cat.icon size={20} color={cat.ring} />
              </div>

              {/* 右側：金額 */}
              <span className="font-bold text-xl"
                    style={{ fontFamily: "var(--font-number)" }}
              >
                ¥ {amount.toLocaleString()}
              </span>
            </div>

            {/* 下段: 横棒 */}
            <div className="w-full h-2 rounded-full bg-[var(--color-meter-border)]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: cat.ring }}
                initial={{ width: 0 }}                          //　初期値は0（0円）
                animate={{ width: `${widthPercent}%` }}         // 計算後のグラフの長さ
                transition={{ duration: 0.8, ease: "easeOut" }} // アニメーション速度
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}