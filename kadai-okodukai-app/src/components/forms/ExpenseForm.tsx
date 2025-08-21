// 支出用入力フォーム
import { useState, useEffect } from "react";
import RequiredLabel from "./ui/RequiredLabel";
import OptionalLabel from "./ui/OptionalLabel";
import CategorySelect from "./ui/CategorySelect";
import { ExpenseCategories } from "./categories/ExpenseCategories";
import type { ExpenseInput } from "../../App";

type Props = {
  onSubmit: (payload: ExpenseInput) => Promise<void>;  // 親に「保存してね」とお願いするための関数
};

export default function ExpenseForm({ onSubmit }: Props) {
  // 入力内容を保存するための変数
  const [amount, setAmount] = useState<number | "">("");   // 金額
  const [productName, setProductName] = useState("");      // 商品名
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // カテゴリー
  const [date, setDate] = useState("");                    // 日付
  const [memo, setMemo] = useState("");                    // メモ

  // 今日の日付を自動的に最初から入れておく
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // ローカルストレージに保存　→ ページ移動しても入力が消えないように
  useEffect(() => {
  // 復元
  const saved = localStorage.getItem("expenseForm");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.amount) setAmount(parsed.amount);
      if (parsed.productName) setProductName(parsed.productName);
      if (parsed.category) setSelectedCategory(parsed.category);
      if (parsed.date) setDate(parsed.date);
      if (parsed.memo) setMemo(parsed.memo);
    }
  }, []);

  // 入力が変わった場合 → すぐにローカルストレージに保存
  useEffect(() => {
    // 保存
    localStorage.setItem(
      "expenseForm",
      JSON.stringify({
        amount,
        productName,
        category: selectedCategory,
        date,
        memo,
      })
    );
  }, [amount, productName, selectedCategory, date, memo]);

  // 「追加」ボタンを押したとき
  const handleAdd = async () => {

     // アラート文指定
    if (typeof amount !== "number" || amount <= 0) {
      alert("金額を入力してください");
      return;
    }
    if (!productName.trim()) {
      alert("商品名を入力してください");
      return;
    }
    if (!selectedCategory) {
      alert("カテゴリーを選択してください");
      return;
    }

    // 入力された内容を送る
    await onSubmit({
      amount,
      productName,
      category: selectedCategory,
      memo,
      date,
    });

    // 入力をリセットして、保存していた内容も消す
    setAmount("");
    setProductName("");
    setSelectedCategory("");
    setMemo("");
    localStorage.removeItem("expenseForm");
  };

  return (
    <div className="p-[30px_20px] border border-[var(--color-meter-border)] shadow-[var(--color-shadow)] rounded-[10px] space-y-10 bg-white">

      {/* 金額 */}
      <div>
        <label className="flex items-center gap-5 text-[16px]">
          金額 <RequiredLabel />
        </label>
        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border-b border-[var(--color-meter-border)]
                     px-2.5 pt-[15px] pb-[12px]
                     text-[16px] placeholder:text-[14px]
                     appearance-none focus:outline-none focus:ring-0"
        />
      </div>

      {/* 商品名 */}
      <div>
        <label className="flex items-center gap-5 text-[16px]">
          商品名 <RequiredLabel />
        </label>
        <input
          type="text"
          placeholder="例）サイゼリヤ"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full border-b border-[var(--color-meter-border)]
                     px-2.5 pt-[15px] pb-[12px]
                     text-[16px] placeholder:text-[14px]
                     appearance-none focus:outline-none focus:ring-0"
        />
      </div>

      {/* カテゴリー */}
      <div>
        <label className="flex items-center gap-5 mb-5 text-[16px]">
          カテゴリー <RequiredLabel />
        </label>
        <div className="flex flex-wrap gap-5">
          {ExpenseCategories.map((cat) => (
            <CategorySelect
              key={cat.label}
              label={cat.label}
              icon={cat.icon}
              bgColor={cat.bg}
              ringColor={cat.ring}
              selected={selectedCategory === cat.label}
              onClick={() => setSelectedCategory(cat.label)}
            />
          ))}
        </div>
      </div>

      {/* 日付 */}
      <div>
        <label className="flex items-center gap-5 text-[16px]">
          日付 <RequiredLabel />
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border-b border-[var(--color-meter-border)]
                     px-2.5 pt-[15px] pb-[12px]
                     text-base placeholder:text-sm text-[var(--color-text-sub)]
                     appearance-none focus:outline-none focus:ring-0
                     [&::-webkit-calendar-picker-indicator]:opacity-100     // 不透明度100%（ハッキリ表示）
                     [&::-webkit-calendar-picker-indicator]:invert-[60%]    // 色を 60% 反転して落ち着いたトーンに
                     [&::-webkit-calendar-picker-indicator]:sepia-[10%]     // ほんのりセピア（色味を温かく）
                     [&::-webkit-calendar-picker-indicator]:saturate-[0%]"  // 彩度をゼロに近づけて、グレー寄りに
        />
      </div>

      {/* メモ */}
      <div>
        <label className="flex items-center gap-5">
          メモ <OptionalLabel />
        </label>
        <input
          type="text"
          placeholder="例）友達と昼ごはん"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full border-b border-[var(--color-meter-border)]
                     px-2.5 pt-[15px] pb-3
                     text-base placeholder:text-sm
                     appearance-none focus:outline-none focus:ring-0"
        />

        {/* 追加ボタン */}
        <button 
          type="button"
          onClick={handleAdd}
          className="w-full bg-[var(--color-main)] text-white rounded-[10px] py-2 mt-7.5">
          追加
        </button>
      </div>
    </div>
  );
}
