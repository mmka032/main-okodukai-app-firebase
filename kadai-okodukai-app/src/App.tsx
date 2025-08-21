import { useEffect, useState } from "react";
import db from "./lib/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

import Layout from "./components/Layout";
import Home from "./components/each_page/Home";
import Input from "./components/each_page/Input";
import History from "./components/each_page/History";
import Graph from "./components/each_page/Graph";


// アプリのタブで使うキー（ホーム / 入力 / 履歴 / グラフ）
export type NavKey = "home" | "input" | "history" | "graph";


// 支出 / 収入 （取引の種類）
type TxType = "expense" | "income";


// Firestoreに保存する「1件の取引」データ型
export type Transaction = {
  type: TxType;           // "expense"（支出）か "income"（収入）
  amount: number;         // 金額
  category: string;       // カテゴリー（食費など）
  productName?: string;   // 商品名（支出のみ）
  memo?: string;          // 任意メモ
  date: string;           // 入力時に指定する日付（表示用）
  createdAt: Timestamp;   // Firestoreが記録する作成日時（並び替え用）
};


// 入力用データ（支出）
export type ExpenseInput = {
  amount: number;         // 金額
  category: string;       //カテゴリ（アイコン）
  productName: string;    // 商品名
  memo?: string;          // メモ
  date: string;           // yyyy-mm-dd（日付）
};


// 入力用データ（収入）
export type IncomeInput = {
  amount: number;         // 金額
  category: string;       //カテゴリ（アイコン）
  memo?: string;          // メモ
  date: string;           // yyyy-mm-dd（日付）
};



function App() {
  // どのページ（タブ）を開いているかを覚えておく（初期値は "home"）
  const [activeTab, setActiveTab] = useState<NavKey>("home");

  // Firestore から読み込んだ取引データをここに入れておく
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 入力完了後に「ホーム」画面へ戻る処理
  const handleSubmitSuccess = () => {
    setActiveTab("home");
  };

  // Firestoreからデータをリアルタイム取得
  useEffect(() => {
    // 「作成日時の新しい順」で並べるように
    const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));

    // onSnapshot でデータの変化をリアルタイムに受け取る
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as Transaction);
      setTransactions(data);  // 読み込んだものを state に保存
    });
    return () => unsubscribe();
  }, []);

  // Firestore に追加（支出）
  const addExpense = async (payload: ExpenseInput) => {
    await addDoc(collection(db, "transactions"), {
      type: "expense",                    // 支出 / 収入
      amount: payload.amount,             // 金額
      category: payload.category,         // カテゴリ
      productName: payload.productName,   // 商品名
      memo: payload.memo ?? "",           // メモ
      date: payload.date,                 // 日時
      createdAt: Timestamp.now(),         // 作成日時、並び替え用
    });
  };

  // Firestore に追加（収入）
  const addIncome = async (payload: IncomeInput) => {
    await addDoc(collection(db, "transactions"), {
      type: "income",                     // 支出 / 収入
      amount: payload.amount,             // 金額
      category: payload.category,         // カテゴリ
      memo: payload.memo ?? "",           // メモ
      date: payload.date,                 // 日時
      createdAt: Timestamp.now(),         // 作成日時（並べ替え用）
    }); 
  };

  // ページタイトル
  const getTitle = () => {
    switch (activeTab) {
      case "home":
        return "ホーム";
      case "input":
        return "入力";
      case "history":
        return "履歴";
      case "graph":
        return "グラフ";
    }
  };

  // ページ切り替え
  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home
            transactions={transactions}   // Firestoreからの全データを渡す
            activeTab={activeTab}         // 今どのタブか
            onTabChange={setActiveTab}    // タブ切替用の関数を渡す
          />
        );
      case "input":
        return (
          <Input
            onAddExpense={addExpense}             // ExpenseForm で submit 時に呼び出す
            onAddIncome={addIncome}               // IncomeForm で submit 時に呼び出す
            onSubmitSuccess={handleSubmitSuccess} // 送信成功後に Home に自動移行
          />
        );
      case "history":
        return <History />;
      case "graph":
        return <Graph />;
    }
  };

  return (
    <Layout 
      title={getTitle()}               // タイトル（ホーム/入力/履歴/グラフ）
      activeTab={activeTab}            // 今どのタブか（現在選択中のタブ）
      onTabChange={setActiveTab}>      
      {renderPage()}                  
    </Layout>
  );
}
 // onTabChange={setActiveTab}>   タブを切り替えるときに呼ばれる関数
 // {renderPage()}                ↑の関数で選んだページを表示
export default App;
