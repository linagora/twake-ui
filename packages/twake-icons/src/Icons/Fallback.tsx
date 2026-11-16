// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgFallback({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 16"
      ref={iconRef}
      {...props}
    >
      <path
        fill="#e8edf3"
        stroke="#4f5b69"
        d="M3.2.5h5.792L13.9 5.407V12.8a2.7 2.7 0 0 1-2.7 2.7h-8a2.7 2.7 0 0 1-2.7-2.7V3.2A2.7 2.7 0 0 1 3.2.5Z"
      />
      <path
        fill="#4f5b69"
        d="M14.4 5.4 9 0v2.793C9 4.233 10.128 5.4 11.52 5.4z"
      />
    </svg>
  );
}
export default SvgFallback;

