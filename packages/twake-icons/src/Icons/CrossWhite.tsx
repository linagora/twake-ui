// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgCrossWhite({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ref={iconRef}
      {...props}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M10.586 12 .293 1.707A1 1 0 0 1 1.707.293L12 10.586 22.293.293a1 1 0 0 1 1.414 1.414L13.414 12l10.293 10.293a1 1 0 0 1-1.414 1.414L12 13.414 1.707 23.707a1 1 0 0 1-1.414-1.414z"
      />
    </svg>
  );
}
export default SvgCrossWhite;

