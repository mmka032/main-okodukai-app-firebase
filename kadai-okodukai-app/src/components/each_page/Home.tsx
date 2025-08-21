// ホームページ（支出・収入の円グラフ・棒グラフ・最近の履歴・月切り替えUIを表示）
import { useState, useMemo } from "react";
import Layout from "../Layout";
import type { NavKey } from "../BottomNav";
import TabSwitch from "../TabSwitch";
import type { RiType } from "../TabSwitch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RecentHistory from "../home_elements/RecentHistory";
import type { Transaction } from "../../App";
import { categoryMap } from "../forms/categories/categoryMap";
import MyPieChart from "../home_elements/chart/PieChart";
import CategoryBarChart from "../home_elements/chart/CategoryBarChart"


type Props = {
  transactions: Transaction[];         // Firestore から取得した取引一覧
  activeTab: NavKey;                   // 現在のタブ
  onTabChange: (tab: NavKey) => void;  // タブが切り替わったときに呼ばれる関数
};


export default function Home({ transactions, activeTab, onTabChange }: Props) {
  const [riType, setRiType] = useState<RiType>("expense");

  // 最新 5件の取引を RecentHistory 用に変換
  const recentItems = useMemo(() => {
    return transactions.slice(0, 5).map((tx, idx) => {
      // 各取引のカテゴリ情報をcategoryMapから取得
      const cat = categoryMap[tx.category];  
      return {
        id: String(idx), 

        // タイトル
        // 収入の場合はカテゴリ名、支出の場合は商品名（未設定なら "(不明)"）
        title: tx.type === "income" ? tx.category : (tx.productName || "(不明)"),

        // サブタイトル
        // 支出の場合は「カテゴリ＋メモ」を表示 収入の場合はメモのみ
        subtitle:
          tx.type === "income"
            ? tx.memo || undefined
            : `${tx.category}${tx.memo ? `（${tx.memo}）` : ""}`,

        amount: tx.amount,    // 金額
        type: tx.type,        // 支出 / 収入 

        // アイコン
        icon: cat?.icon,      
        bg: cat?.bg,          
        ringColor: cat?.ring,
      };
    });
  }, [transactions]);


  // 円グラフダミーデータ
  // 支出
  const expenseData = [
    { name: "食費", value: 5700, color: "#F7B85C" },
    { name: "日用品", value: 2000, color: "#3FB88C" },
    { name: "交通", value: 7800, color: "#6EB9F7" },
    { name: "衣服", value: 2000, color: "#F37C9D" },
    { name: "その他", value: 1000, color: "#B0B0B0" },
  ];

  // 収入
  const incomeData = [
    { name: "バイト", value: 43000, color: "#7CB342" },
    { name: "臨時収入", value: 10000, color: "#42A5F5" },
    { name: "その他", value: 3000, color: "#B0B0B0" },
  ];

  // 棒グラフ用：カテゴリごとの合計金額をオブジェクトでまとめる
  // 支出
  const expenseTotals = expenseData.reduce((acc, item) => {
    acc[item.name] = item.value;      // name をキー、value を値として代入「食費: 5700」みたいに登録
    return acc;
  }, {} as Record<string, number>);   // 初期値は空のオブジェクト

  // 収入
  const incomeTotals = incomeData.reduce((acc, item) => {
    acc[item.name] = item.value;      // name をキー、value を値として代入
    return acc;
  }, {} as Record<string, number>);   // 初期値は空のオブジェクト

  // 支出 / 収入 かでグラフに渡すデータを切り替える
  const chartData = riType === "expense" ? expenseData : incomeData;
  const totals = riType === "expense" ? expenseTotals : incomeTotals;

  return (
    <Layout title="ホーム" activeTab={activeTab} onTabChange={onTabChange}>
      {/* 月切り替えエリア（UIのみ） */}
      <div className="flex items-center justify-center mb-12.5 gap-[135px]">
        <button><ChevronLeft className="w-6 h-6" /></button>
        <span className="text-xl font-bold">7月</span>
        <button><ChevronRight className="w-6 h-6" /></button>
      </div>


      {/* 円グラフ */}
      <MyPieChart 
        data={chartData} 
        totalLabel={`${riType === "expense" ? "支出" : "収入"} `} 
      />


      {/* 支出 / 収入 切り替えタブ */}
      <div className="mb-5">
        <TabSwitch 
        value={riType} 
        onChange={setRiType} 
        className="mx-auto mb-7.5"/>
      </div>
      

      {/* カテゴリ別グラフ（棒グラフ） */}
      <CategoryBarChart type={riType} totals={totals} max={50000} />


      {/* 最近の履歴 */}
      <RecentHistory
        items={recentItems}
        onItemClick={() => onTabChange("history")} // ←カード押したら履歴に
      />
      
    </Layout>
  );
}
