// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgFlashlight({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 16"
      ref={iconRef}
      {...props}
    >
      <path d="M9.8 0H.2v4.8l1.6 2.4V16h6.4V7.2l1.6-2.4zM8.2 1.6v.8H1.8v-.8zM6.6 6.72v7.68H3.4V6.712l-1.6-2.4V4h6.4v.312z" />
      <path d="M5 10.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4" />
    </svg>
  );
}
export default SvgFlashlight;

