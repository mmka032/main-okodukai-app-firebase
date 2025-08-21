// 支出・収入円グラフ
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// グラフ1つ分のデータ型
type ChartItem = {
  name: string;       // カテゴリ名（例: "食費"）
  value: number;      // 値（例: 12000）
  color: string;      // 円グラフに使用するカラー
};


type Props = {
  data: ChartItem[];  // 表示するデータ（カテゴリごとの配列）
  totalLabel: string; // 例: 支出 / 収入 中央表示
};

export default function MyPieChart({ data, totalLabel }: Props) {
  // 合計値を計算（中央に合計金額を表示）
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative w-85 h-85 mx-auto mb-15">
      {/* 親要素の幅・高さに自動対応するコンテナ → レイアウト崩れしにくい利点 */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}        // 表示データ
            dataKey="value"    // 各要素の "value"(金額)を使用し割合計算をするもの
            cx="50%"           // 中心の X座標 (50%＝真ん中に)
            cy="50%"           // 中心の Y座標 (50%＝真ん中に)
            innerRadius={90}   // 内側の半径（ドーナツグラフの穴の大きさ）
            outerRadius={170}  // 外側の半径
            stroke="none"      // カテゴリ境界線なしグラフ
          >
            {/* データごとに色付きセルを生成 */}
            {data.map((entry, index) => (
              <Cell 
              key={`cell-${index}`} 
              fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 真ん中の合計ラベル */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3px]">

        {/* 上段ラベル（例: "支出"） */}
        <span className="text-lg">{totalLabel}</span>

        {/* 下段 合計金額 */}
        <span 
          className="text-3xl font-bold "
          style={{ fontFamily: "var(--font-number)" }}
          >¥ {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
