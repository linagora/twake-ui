// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgGrid({
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
      <path d="M0 7.111V0h7.111v7.111zM0 16V8.889h7.111V16zm8.889-8.889V0H16v7.111zm0 8.889V8.889H16V16zM1.778 5.333h3.555V1.778H1.778zm8.889 0h3.555V1.778h-3.555zm0 8.89h3.555v-3.556h-3.555zm-8.89 0h3.556v-3.556H1.778v3.555Z" />
    </svg>
  );
}
export default SvgGrid;

