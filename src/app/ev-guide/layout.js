export default function EvGuideLayout({ children }) {
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
        /* Reset any global dark theme */
        .dark body, [data-theme="dark"] body {
          background: #ffffff !important;
          color: #111111 !important;
        }
      `}</style>
      {children}
    </>
  );
}
