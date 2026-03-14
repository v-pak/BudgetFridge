export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-heading text-[22px] font-medium text-text mb-4">
      {children}
      <span className="flex-1 h-px bg-accent opacity-30" />
    </div>
  );
}