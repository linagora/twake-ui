// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgBankCheck({
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
      <path
        fillRule="evenodd"
        d="M14 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3H2v7h12zm-2 1v1h-.5a1.5 1.5 0 0 0-1.415 1H12v1h-1.914c.19.54.68.937 1.27.993L11.5 10h.5v1h-.5a2.5 2.5 0 0 1-.164-4.995L11.5 6zM8 9v1H4V9zm0-2v1H4V7z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default SvgBankCheck;

