// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgSportBag({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      ref={iconRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4 5a4 4 0 1 1 8 0h.459a3 3 0 0 1 2.96 2.507l.5 2A3 3 0 0 1 12.958 13H3.042a3 3 0 0 1-2.96-3.493l.5-2A3 3 0 0 1 3.543 5zm2 0a2 2 0 1 1 4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default SvgSportBag;

