// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgDataControl({
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
      <path d="M7.111 8.889H3.556v3.555H7.11V8.89Zm5.333 0H8.89v3.555h3.555V8.89Z" />
      <path d="M14.222 0H1.778C.8 0 0 .8 0 1.778v12.444C0 15.2.8 16 1.778 16h12.444C15.2 16 16 15.2 16 14.222V1.778C16 .8 15.2 0 14.222 0m0 14.222H1.778V1.778h12.444z" />
      <path d="M7.111 3.556H3.556V7.11H7.11zm5.333 0H8.89V7.11h3.555z" />
    </svg>
  );
}
export default SvgDataControl;

