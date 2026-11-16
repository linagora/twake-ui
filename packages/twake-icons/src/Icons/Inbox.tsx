// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgInbox({
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
      <path d="M14.222 0H1.778C.8 0 0 .8 0 1.778v12.444C0 15.2.791 16 1.778 16h12.444C15.2 16 16 15.2 16 14.222V1.778C16 .8 15.2 0 14.222 0m0 14.222H1.778v-2.666h3.164a3.54 3.54 0 0 0 3.067 1.777c1.315 0 2.444-.72 3.067-1.777h3.146zm0-4.444H9.787c0 .978-.8 1.778-1.778 1.778s-1.778-.8-1.778-1.778H1.778v-8h12.444z" />
    </svg>
  );
}
export default SvgInbox;

