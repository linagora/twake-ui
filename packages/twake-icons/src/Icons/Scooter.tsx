// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgScooter({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 12"
      ref={iconRef}
      {...props}
    >
      <path d="M13.6 2c0-.88-.72-1.6-1.6-1.6H9.6V2H12v2.12L9.216 7.6H6.4v-4H3.2A3.2 3.2 0 0 0 0 6.8v2.4h1.6c0 1.328 1.072 2.4 2.4 2.4s2.4-1.072 2.4-2.4h3.584L13.6 4.68zm-12 5.6v-.8c0-.88.72-1.6 1.6-1.6h1.6v2.4zM4 10c-.44 0-.8-.36-.8-.8h1.6c0 .44-.36.8-.8.8" />
      <path d="M6.4 1.2h-4v1.6h4zm7.2 5.6a2.397 2.397 0 0 0-2.4 2.4c0 1.328 1.072 2.4 2.4 2.4S16 10.528 16 9.2s-1.072-2.4-2.4-2.4m0 3.2c-.44 0-.8-.36-.8-.8s.36-.8.8-.8.8.36.8.8-.36.8-.8.8" />
    </svg>
  );
}
export default SvgScooter;

