// 履歴ページ
import { useState } from "react";
import Layout from "../Layout";
import type { NavKey } from "../BottomNav";

export default function History() {
  const [tab, setTab] = useState<NavKey>("history");

  return (
    <Layout title="履歴" activeTab={tab} onTabChange={setTab}>
      {/* 履歴ページのコンテンツ */}
      <p className="text-center">ここに履歴ページの内容が入ります</p>
    </Layout>
  );
}
