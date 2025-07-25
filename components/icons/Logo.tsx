const Logo = ({
  className = "w-[54px] h-[54px]",
  bgColor,
}: {
  className?: string;
  bgColor?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="54"
        height="54"
        rx="15"
        style={{ fill: bgColor ? bgColor : "var(--color-background)" }}
      />
      <path
        d="M11 34C11 32.8954 11.8954 32 13 32H26C27.1046 32 28 32.8954 28 34V42H11V34Z"
        style={{ fill: "var(--color-sidebar-foreground)", opacity: 0.1 }}
      />
      <path
        d="M20 24C20 22.8954 20.8954 22 22 22H34C35.1046 22 36 22.8954 36 24V42H20V24Z"
        style={{ fill: "var(--color-sidebar-foreground)", opacity: 0.3 }}
      />
      <path
        d="M28 14C28 12.8954 28.8954 12 30 12H41C42.1046 12 43 12.8954 43 14V42H28V14Z"
        style={{ fill: "var(--color-sidebar-foreground)", opacity: 0.8 }}
      />
    </svg>
  );
};

export default Logo;
