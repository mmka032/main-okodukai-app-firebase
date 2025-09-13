// 上部の・タイトル（例:「ホーム」「入力（支出登録）」）を表示
type Props = {
  title?: string;
};

export default function Header({ title = "ホーム" }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <div className="max-w-xl mx-auto flex items-center justify-center pt-[65px] pb-[15px] bg-[var(--color-bg-fixed)]">
        <h1 className="text-lg font-bold">
          {title}
        </h1>
      </div>
    </header>
  );
}