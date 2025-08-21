// 入力ページ（支出 / 収入登録）
import { useState } from "react";
import Layout from "../Layout";
import type { NavKey } from "../BottomNav";
import TabSwitch from "../TabSwitch"
import type { RiType } from "../TabSwitch";
import ExpenseForm from "../forms/ExpenseForm";
import IncomeForm from "../forms/IncomeForm";
import type { ExpenseInput, IncomeInput } from "../../App";


type Props = {
  onAddExpense: (payload: ExpenseInput) => Promise<void>;  // 支出追加処理
  onAddIncome: (payload: IncomeInput) => Promise<void>;    // 収入追加処理
  onSubmitSuccess: () => void;                             // Homeに戻る
};

export default function Input({ onAddExpense, onAddIncome, onSubmitSuccess }: Props) {
  const [tab, setTab] = useState<NavKey>("input");         
  const [riType, setRiType] = useState<RiType>("expense");  

  return (
    <Layout 
      title={`入力（${riType === "expense" ? "支出" : "収入"}登録）`}
      activeTab={tab}
      onTabChange={setTab}
    >

      <div className="mb-5">
        <TabSwitch value={riType} onChange={setRiType} className="mx-auto mb-7.5" />
      </div>

      {/* TabSwichでのフォームの切り替え（支出 / 収入） */}
      {riType === "expense" ? (
        <ExpenseForm
          onSubmit={async (payload) => {
            await onAddExpense(payload);   // Firestoreに保存
            onSubmitSuccess();             // 送信後にHomeへ
          }}
        />
      ) : (
        <IncomeForm
          onSubmit={async (payload) => {
            await onAddIncome(payload);   // Firestoreに保存
            onSubmitSuccess();            // 送信後にHomeへ
          }}
        />
      )}
    </Layout>
  );
}
