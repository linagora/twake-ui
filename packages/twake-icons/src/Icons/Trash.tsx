// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgTrash({
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
      <path d="M3.556 16q-.734 0-1.256-.522a1.7 1.7 0 0 1-.522-1.256V2.667h-.89V.889h4.445V0h5.334v.889h4.444v1.778h-.889v11.555q0 .734-.522 1.256a1.7 1.7 0 0 1-1.256.522zm8.888-13.333H3.556v11.555h8.888zm-7.11 9.777H7.11v-8H5.333zm3.555 0h1.778v-8H8.889z" />
    </svg>
  );
}
export default SvgTrash;

