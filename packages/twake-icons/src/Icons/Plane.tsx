// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgPlane({
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
      <path d="M15.2 11.2V9.6l-6.4-4V1.2C8.8.536 8.264 0 7.6 0S6.4.536 6.4 1.2v4.4L0 9.6v1.6l6.4-2v4.4l-1.6 1.2V16l2.8-.8 2.8.8v-1.2l-1.6-1.2V9.2z" />
    </svg>
  );
}
export default SvgPlane;

