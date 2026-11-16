// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgPrinter({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 15"
      ref={iconRef}
      {...props}
    >
      <path d="M13.6 4h-.8V0H3.2v4h-.8A2.397 2.397 0 0 0 0 6.4v4.8h3.2v3.2h9.6v-3.2H16V6.4C16 5.072 14.928 4 13.6 4M4.8 1.6h6.4V4H4.8zm6.4 11.2H4.8V9.6h6.4zm1.6-3.2V8H3.2v1.6H1.6V6.4c0-.44.36-.8.8-.8h11.2c.44 0 .8.36.8.8v3.2z" />
      <path d="M12.8 7.6a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6" />
    </svg>
  );
}
export default SvgPrinter;

