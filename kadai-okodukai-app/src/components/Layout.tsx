// 画面の共通レイアウト（ヘッダー・コンテンツ・下ナビ）をまとめるコンポーネント
import { useEffect } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import type { NavKey } from "./BottomNav";


type LayoutProps = {
  title: string;                       // 画面タイトル（ヘッダーに表示）
  children: React.ReactNode;           // 中身（各ページのコンテンツ）
  activeTab: NavKey;                   // 今どのタブが選ばれているか（見た目に反映）
  onTabChange: (tab: NavKey) => void;  // タブを切り替えたい時に呼ぶ関数
};

export default function Layout({
  title,
  children,
  activeTab,
  onTabChange,
}: LayoutProps) {

  // タブ変更時に上にスクロール（例: ホーム → 入力）
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div>

      {/* ヘッダー */}
      <Header title={title} />

      {/* コンテンツ */}
      <main className="flex-1 w-full mt-35 pb-17.5">
        <div className="max-w-87.5 mx-auto">
          {children}
        </div>
      </main>

      {/* ボトムナビ */}
      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
}
