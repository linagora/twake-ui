// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgTriggers({
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
      <path d="M7.111 4.444V8.89l3.778 2.24.684-1.138-3.129-1.858v-3.69zM16 6.222V0l-2.347 2.347A7.94 7.94 0 0 0 8 0a8 8 0 1 0 8 8h-1.778A6.23 6.23 0 0 1 8 14.222 6.23 6.23 0 0 1 1.778 8 6.23 6.23 0 0 1 8 1.778c1.716 0 3.271.702 4.4 1.822L9.778 6.222z" />
    </svg>
  );
}
export default SvgTriggers;

