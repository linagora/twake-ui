// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgLabel({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 12"
      ref={iconRef}
      {...props}
    >
      <path d="M12.82.813a1.68 1.68 0 0 0-1.373-.708L2.184.114C1.258.114.5.864.5 1.79v8.42c0 .927.758 1.676 1.684 1.676l9.263.009a1.68 1.68 0 0 0 1.373-.707L16.5 6zm-1.373 9.398H2.184V1.79h9.263L14.437 6z" />
    </svg>
  );
}
export default SvgLabel;

