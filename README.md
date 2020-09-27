# babel-plugin-transform-strip-block

> Strip blocks of code marked by special comment tags.

Using npm:

```sh
npm install --save-dev babel-plugin-transform-strip-block
```

or using yarn:

```sh
yarn add babel-plugin-transform-strip-block --dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    [ "babel-plugin-transform-strip-block", { "requireDirective": true, "identifiers": [{ "start": "block:start", "end": "block:end" }] }]
  ]
}
```

### Via Webpack

**.webpack.config.js**

```javascript
  ...
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['babel-plugin-transform-strip-block', { requireDirective: true, identifiers: [{ start: 'block:start', end: 'block:end' }] }]
          ]
        }
      }
    }
  ]
  ...
```

### Example

In:
```javascript
// @strip-block

const foo = {
  /* block:start */
  bar: 'baz',
  /* block:end */
}
```

Out:
```javascript
const foo = {}
```
