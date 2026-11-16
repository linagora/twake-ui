// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgMovement({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 8"
      ref={iconRef}
      {...props}
    >
      <path d="M12.01 3H0v2h12.01v3L16 4l-3.99-4z" />
    </svg>
  );
}
export default SvgMovement;

