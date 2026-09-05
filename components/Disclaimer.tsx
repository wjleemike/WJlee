export default function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-slate-500 text-center leading-relaxed">
        本網站為非官方 TOEIC 風格練習工具，與 ETS® 無關。｜Unofficial practice only;
        not affiliated with ETS.
      </p>
    );
  }

  return (
    <aside
      className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
      role="note"
    >
      <p className="font-medium mb-1">免責聲明 / Disclaimer</p>
      <p className="leading-relaxed">
        本網站提供原創的非官方 TOEIC 風格練習題，僅供學習使用。內容與
        ETS®、TOEIC® 無關，亦未使用任何受著作權保護的正式考題。This site
        offers original unofficial practice questions only and is not
        affiliated with ETS or the TOEIC test.
      </p>
    </aside>
  );
}
