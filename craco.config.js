const pug = {
  overrideCracoConfig: ({ cracoConfig }) => {
    if (cracoConfig.babel == null) {
      cracoConfig.babel = {}
    }

    if (cracoConfig.babel.plugins == null) {
      cracoConfig.babel.plugins = []
    }

    cracoConfig.babel.plugins.push('transform-react-pug')
    return cracoConfig
  }
}

module.exports = {
  eslint: {
    enable: false
  },
  plugins: [
    {
      plugin: pug
    }
  ]
}
