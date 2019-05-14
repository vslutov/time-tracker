const Generator = require('yeoman-generator')
const { fs } = require('mz')
const path = require('path')
const { startsWith, complement } = require('ramda')

const isSourceFile = complement(startsWith('.'))

const upFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1)

const lowFirstLetter = str =>
  str.charAt(0).toLowerCase() + str.slice(1)

const camelToSnake = (string) => (string
  .replace(/([^A-Z])([A-Z])/g, '$1_$2')
  .toUpperCase()
)

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    // This makes `appname` a required argument.
    this.argument('componentName', { type: String, required: true })
  }

  async writing () {
    const { componentName } = this.options

    const upperComponent = upFirstLetter(componentName)
    const lowerComponent = lowFirstLetter(componentName)
    const snakeComponent = camelToSnake(componentName)

    for (const fname of await fs.readdir(this.sourceRoot())) {
      if (isSourceFile(fname)) {
        this.fs.copyTpl(
          this.templatePath(fname),
          this.destinationPath(path.join('src', upperComponent, fname)),
          { lowerComponent, upperComponent, snakeComponent }
        )
      }
    }
  }
}
