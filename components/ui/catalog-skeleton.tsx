export function CatalogSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {[1, 2, 3, 4].map((i, idx) => (
        <div 
          key={i} 
          className="flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm animate-fade-in-up"
          style={{ animationDelay: `${idx * 150}ms` }}
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
          
          <div className="mb-6 flex-1 space-y-4">
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-7 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          </div>
          
          <div className="flex items-end justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
            <div className="space-y-2">
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
