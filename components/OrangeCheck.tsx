type OrangeCheckProps = {
  className?: string;
};

export default function OrangeCheck({ className = "" }: OrangeCheckProps) {
  return (
    <svg
      className={`mt-[0.2em] h-4 w-4 shrink-0 text-[#BD4A1A] ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
