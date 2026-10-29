// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgMusic({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 16"
      ref={iconRef}
      {...props}
    >
      <path d="m6 0 .009 9.378a3.55 3.55 0 0 0-1.778-.49 3.556 3.556 0 1 0 0 7.112 3.54 3.54 0 0 0 3.547-3.556V3.556h3.555V0zM4.231 14.222c-.978 0-1.778-.8-1.778-1.778 0-.977.8-1.777 1.778-1.777s1.778.8 1.778 1.777c0 .978-.8 1.778-1.778 1.778" />
    </svg>
  );
}
export default SvgMusic;

