// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgPieChart({
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
      <path d="M8 16a7.8 7.8 0 0 1-3.12-.63 8.1 8.1 0 0 1-2.54-1.71 8.1 8.1 0 0 1-1.71-2.54A7.8 7.8 0 0 1 0 8q0-1.66.63-3.12t1.71-2.54A8.1 8.1 0 0 1 4.88.63 7.8 7.8 0 0 1 8 0a7.8 7.8 0 0 1 3.12.63q1.46.63 2.54 1.71c1.08 1.08 1.29 1.567 1.71 2.54Q16 6.34 16 8a7.8 7.8 0 0 1-.63 3.12 8.1 8.1 0 0 1-1.71 2.54 8.1 8.1 0 0 1-2.54 1.71A7.8 7.8 0 0 1 8 16m0-1.6q2.68 0 4.54-1.86T14.4 8H8V1.6q-2.68 0-4.54 1.86T1.6 8c0 2.68.62 3.3 1.86 4.54Q5.32 14.4 8 14.4" />
    </svg>
  );
}
export default SvgPieChart;

