// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgCrop({
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
      <path d="M11.636 10.182h1.455V4.364c0-.8-.655-1.455-1.455-1.455H5.818v1.455h5.818zm-7.272 1.454V0H2.909v2.91H0v1.454h2.91v7.272c0 .8.654 1.455 1.454 1.455h7.272V16h1.455v-2.91H16v-1.454z" />
    </svg>
  );
}
export default SvgCrop;

