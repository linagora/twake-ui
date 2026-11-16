// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgWork({
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
      <path d="M14.4 3.2h-3.2V1.6c0-.888-.712-1.6-1.6-1.6H6.4c-.888 0-1.6.712-1.6 1.6v1.6H1.6C.712 3.2.008 3.912.008 4.8L0 13.6c0 .888.712 1.6 1.6 1.6h12.8c.888 0 1.6-.712 1.6-1.6V4.8c0-.888-.712-1.6-1.6-1.6m-4.8 0H6.4V1.6h3.2z" />
    </svg>
  );
}
export default SvgWork;

