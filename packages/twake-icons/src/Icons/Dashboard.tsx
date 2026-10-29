// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgDashboard({
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
      <path d="M14.222 1.778v1.778h-3.555V1.778zm-8.889 0V7.11H1.778V1.778zm8.89 7.11v5.334h-3.556V8.89h3.555Zm-8.89 3.556v1.778H1.778v-1.778zM16 0H8.889v5.333H16zM7.111 0H0v8.889h7.111zM16 7.111H8.889V16H16zm-8.889 3.556H0V16h7.111z" />
    </svg>
  );
}
export default SvgDashboard;

