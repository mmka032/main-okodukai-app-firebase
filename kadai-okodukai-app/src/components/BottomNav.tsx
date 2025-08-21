// 下部の固定ナビゲーション（ホーム / 入力 / 履歴 / グラフ）
import { Home, Pencil, Calendar, PieChart } from "lucide-react"; // アイコン用

export type NavKey = "home" | "input" | "history" | "graph";

type Props = {
  active?: NavKey;                  // 今どのタブが選ばれているか
  onChange?: (k: NavKey) => void;   // タブを切り替えたいときに親に知らせるための関数
};

export default function BottomNav({ active = "home", onChange }: Props) {
  // ナビに並べる項目
  const items: { key: NavKey; label: string; icon: React.ElementType }[] = [
    { key: "home", label: "ホーム", icon: Home },
    { key: "input", label: "入力", icon: Pencil },
    { key: "history", label: "履歴", icon: Calendar },
    { key: "graph", label: "グラフ", icon: PieChart },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-bg-fixed)] z-40 h-22.5">
      <div className="max-w-xl mx-auto h-full flex justify-center items-end pt-2.5 pb-9.5 gap-18 px-7.5">
        {items.map((it) => {
          const isActive = active === it.key;  // active → 今選択しているものに色をつけるなどの目印
          const Icon = it.icon;                // アイコン 
          return (

            // ボタン（どこ押しても反応するように）
            <button
              key={it.key}
              onClick={() => onChange?.(it.key)}
              className="flex flex-col items-center justify-center gap-[3px]"
            >
              <div
                className={`transition-colors ${
                  isActive
                    ? "text-[color:var(--color-main)]"
                    : "text-[color:var(--color-text-main)]"
                }`}
              >
                {/* 選択中のときは線を少し太くして、選択中というのを示す */}
                <Icon
                  size={24}
                  strokeWidth={isActive ? 1.5 : 1} // 線の太さ変更
                />
              </div>
              {/* ラベル（文字）も同じく色と太さを変える*/}
              <span
                className={`text-[11px] transition-colors ${
                  isActive
                    ? "text-[color:var(--color-main)] font-bold"
                    : "text-[color:var(--color-text-main)] font-medium"
                }`}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
