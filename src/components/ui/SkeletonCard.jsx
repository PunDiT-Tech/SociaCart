export default function SkeletonCard() {
  return (
    <div className="bg-[var(--surface-card)] rounded-[var(--radius-lg)] border border-[var(--border-default)] overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-800" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-3/4 bg-[var(--border-default)] rounded-full" />
        <div className="h-3 w-1/2 bg-[var(--border-default)] rounded-full" />
        <div className="flex justify-between mt-2">
          <div className="h-6 w-20 bg-[var(--border-default)] rounded-full" />
          <div className="h-6 w-6 bg-[var(--border-default)] rounded-full" />
        </div>
      </div>
    </div>
  );
}
