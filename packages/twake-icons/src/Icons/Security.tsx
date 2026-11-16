// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgSecurity({
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
      <path d="M8 .667 2 3.333v4c0 3.7 2.56 7.16 6 8 3.44-.84 6-4.3 6-8v-4zm0 7.326h4.667c-.354 2.747-2.187 5.194-4.667 5.96V8H3.333V4.2L8 2.126z" />
    </svg>
  );
}
export default SvgSecurity;

