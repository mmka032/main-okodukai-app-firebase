// グラフページ
import { useState } from "react";
import Layout from "../Layout";
import type { NavKey } from "../BottomNav";

export default function Graph() {
  const [tab, setTab] = useState<NavKey>("graph");

  return (
    <Layout title="グラフ" activeTab={tab} onTabChange={setTab}>
      {/* グラフページのコンテンツ */}
      <p className="text-center">ここにグラフページの内容が入ります</p>
    </Layout>
  );
}
