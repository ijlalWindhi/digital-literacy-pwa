export default function CardPattern({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-800 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pattern-squares"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 10V.5H10" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#pattern-squares)"
        />
      </svg>
    </div>
  );
}
