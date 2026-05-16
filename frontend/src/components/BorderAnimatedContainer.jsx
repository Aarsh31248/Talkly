// function BorderAnimatedContainer({ children }) {
//   return (
//     <div className="w-full h-full [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border  flex overflow-hidden">
//       {children}
//     </div>
//   );
// }
// export default BorderAnimatedContainer;


function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative w-full h-full group">
      {/* OUTER GLOW */}
      <div className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-cyan-400/40 blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />

      {/* ANIMATED BORDER */}
      <div className="relative h-full w-full rounded-[28px] p-[1px] overflow-hidden bg-[conic-gradient(from_var(--border-angle),#0f172a_20%,#06b6d4_35%,#67e8f9_45%,#06b6d4_55%,#0f172a_70%)] animate-border shadow-[0_0_60px_rgba(6,182,212,0.15)]">
        
        {/* MAIN CARD */}
        <div className="relative isolation-isolate flex h-full w-full overflow-hidden rounded-[27px] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_25%),linear-gradient(to_bottom_right,rgba(15,23,42,0.98),rgba(30,41,59,0.96),rgba(15,23,42,0.98))] backdrop-blur-2xl">
          
          {/* GRID OVERLAY */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* CYAN LIGHT EFFECT */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-32 bg-cyan-400/10 blur-3xl rounded-full" />

          {/* INNER BORDER */}
          <div className="absolute inset-[1px] rounded-[26px] border border-white/5 pointer-events-none" />

          {/* CONTENT */}
          <div className="relative z-50 flex w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorderAnimatedContainer;