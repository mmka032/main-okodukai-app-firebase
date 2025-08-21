// 「支出 / 収入」切り替えタブ
import { useEffect, useState } from "react";

// 切り替え対象となる型 (支出 / 収入)
export type RiType = "expense" | "income";

// Props定義
type Props = {
  value?: RiType;                   // 親コンポーネントから直接「今どっちか（支出 / 収入）」を渡したいとき
  onChange: (v: RiType) => void;    // 選んだ方を親に教えてあげるため
  className?: string;               
  defaultValue?: RiType;            // 初期状態。親から value（指示） が渡されない場合に使用
};

export default function TabSwitch({
  value,
  onChange,
  className = "",
  defaultValue = "expense",         // デフォルトは「支出」
}: Props) {
  
  // 今どちらが選ばれているか（支出か収入か）
  const [active, setActive] = useState<RiType>(value ?? defaultValue);

  // 親から value（指示） された場合　→ それに合わせて状態を変える
  useEffect(() => {
    if (value !== undefined && value !== active) setActive(value);
  }, [value]);

  // ボタンが押されたときの動き
  const handleClick = (type: RiType) => {
    setActive(type);  // 自分の中の状態を更新
    onChange(type);   // 親にしたことを教える（ボタンを押したなど）
  };

  return (
    <div
      className={`relative flex w-87.5 h-10 bg-[var(--color-bg-fixed)] rounded-[10px] ${className}`}
    >
       {/* 押した方にに色付きの背景をスライドさせる */}
      <div
        className="absolute top-0 left-0 h-full w-1/2 rounded-[10px] bg-[var(--color-main)] transition-transform duration-300 ease-in-out"
        style={{
          transform: active === "expense" ? "translateX(0)" : "translateX(100%)",
        }}
      />

      {/* 支出ボタン */}
      <button
        type="button"
        onClick={() => handleClick("expense")}
        className={`flex-1 z-10 w-[175px] h-10 font-medium transition-colors duration-300 ${
          active === "expense" ? "text-white" : "text-[var(--color-text-main)]"
        }`}
      >
        支出
      </button>

      {/* 収入ボタン */}
      <button
        type="button"
        onClick={() => handleClick("income")}
        className={`flex-1 z-10 w-[175px] h-10 font-medium transition-colors duration-300 ${
          active === "income" ? "text-white" : "text-[var(--color-text-main)]"
        }`}
      >
        収入
      </button>
    </div>
  );
}
