// 入力フォームのカテゴリ
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";


interface CategorySelectProps {
  label: string;            // カテゴリ名
  icon: ComponentType<LucideProps>;    // lucide-reactアイコンコンポーネント型
  bgColor: string;          // 背景色（var(--color-xxx-bg)）
  ringColor?: string;       // 選択時リング色
  selected?: boolean;       // 選択状態
  onClick?: () => void;     // クリック時
}

export default function CategorySelect({
  label,
  icon: Icon, 
  bgColor,
  ringColor,
  selected = false,
  onClick,
}: CategorySelectProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-sm"
    >
      <div
        className={`w-[43px] h-[43px] rounded-full flex items-center justify-center`}
        style={{
          backgroundColor: bgColor,
          boxShadow: selected && ringColor ? `0 0 0 2px ${ringColor}` : undefined,
        }}
      >
        <Icon className="w-[27px] h-[27px]" color={ringColor} />
      </div>
      <span>{label}</span>
    </button>
  );
}
