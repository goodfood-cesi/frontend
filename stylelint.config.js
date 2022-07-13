module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^ProseMirror',
  },
  customSyntax: 'postcss-html',
}
