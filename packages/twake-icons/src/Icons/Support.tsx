// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgSupport({
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
      <path d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8m5.968 5.696-2.224.92a3.99 3.99 0 0 0-2.36-2.352l.92-2.224a6.37 6.37 0 0 1 3.664 3.656M8 10.4A2.397 2.397 0 0 1 5.6 8c0-1.328 1.072-2.4 2.4-2.4s2.4 1.072 2.4 2.4-1.072 2.4-2.4 2.4M5.704 2.032l.936 2.224a4 4 0 0 0-2.384 2.376l-2.224-.928a6.4 6.4 0 0 1 3.672-3.672m-3.672 8.264 2.224-.92a3.98 3.98 0 0 0 2.376 2.368l-.936 2.224a6.4 6.4 0 0 1-3.664-3.672m8.272 3.672-.92-2.224a3.98 3.98 0 0 0 2.36-2.376l2.224.936a6.4 6.4 0 0 1-3.664 3.664" />
    </svg>
  );
}
export default SvgSupport;

