// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgWarn({
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
      <path d="M11.316 0H4.684L0 4.684v6.632L4.684 16h6.632L16 11.316V4.684zm2.906 10.578-3.644 3.644H5.422l-3.644-3.644V5.422l3.644-3.644h5.156l3.644 3.644z" />
      <path d="M8 12.444a.889.889 0 1 0 0-1.777.889.889 0 0 0 0 1.777m-.889-8.888H8.89v6.222H7.11z" />
    </svg>
  );
}
export default SvgWarn;

