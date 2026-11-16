// packages/twake-icons/scripts/svgr-template.cjs
function defaultTemplate(
  { componentName, props, interfaces, imports, exports, jsx },
  { options, tpl }
) {
  const automaticallyCreatedMention = `// Automatically created, please run \`scripts/generate-svgr.sh ${options.filePath || ''}\` to regenerate`

  return tpl`${automaticallyCreatedMention}

${imports}
${interfaces}
function ${componentName}({ iconRef, ...props }: SVGProps<SVGSVGElement> & { iconRef?: React.Ref<SVGSVGElement> }) {
  return ${jsx};
}
${exports}
  `
}

module.exports = defaultTemplate
