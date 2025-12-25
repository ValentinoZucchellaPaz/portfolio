export function ChevronRightIcon({
  size = 24,
  color = "currentColor",
  fill = false,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill ? color : "none"}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      className="chevron-right-icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
