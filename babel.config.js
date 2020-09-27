'use strict'

module.exports = function (api) {
  const isDev = api.env(['development', 'test'])

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: isDev ? 'current' : '6.9',
          },
        },
      ],
    ],
  }
}
