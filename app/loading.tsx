export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  );
}
