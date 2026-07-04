export default function EvRoiCalculatorLayout({ children }) {
  return (
    <>
      <style>{`
        body {
          background: #ffffff !important;
          color: #111111 !important;
        }
        body * {
          box-sizing: border-box;
        }
        .dark body, [data-theme="dark"] body {
          background: #ffffff !important;
          color: #111111 !important;
        }
      `}</style>
      {children}
    </>
  );
}
