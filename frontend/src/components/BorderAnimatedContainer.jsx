function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle) rounded-2xl border border-transparent  flex overflow-hidden">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;