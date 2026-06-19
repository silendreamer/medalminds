type MedalMarkProps = {
  size?: number;
  className?: string;
};

export function MedalMark({ size = 44, className }: MedalMarkProps) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={className}
      height={size}
      src="/assets/logo.png"
      style={{ display: "block", width: "100%", height: "100%" }}
      width={size}
    />
  );
}
