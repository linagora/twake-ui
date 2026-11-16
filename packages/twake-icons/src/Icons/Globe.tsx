// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgGlobe({
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
      <path d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8M1.6 8c0-.488.064-.968.168-1.424L5.592 10.4v.8c0 .88.72 1.6 1.6 1.6v1.544C4.048 13.944 1.6 11.256 1.6 8m11.112 4.32a1.59 1.59 0 0 0-1.52-1.12h-.8V8.8c0-.44-.36-.8-.8-.8h-4.8V6.4h1.6c.44 0 .8-.36.8-.8V4h1.6c.88 0 1.6-.72 1.6-1.6v-.328A6.4 6.4 0 0 1 14.4 8a6.4 6.4 0 0 1-1.688 4.32" />
    </svg>
  );
}
export default SvgGlobe;

