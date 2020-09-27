import path from 'path'
import pluginTester from 'babel-plugin-tester'
import transformStripBlockPlugin from '../src'

pluginTester({
  plugin: transformStripBlockPlugin,
  pluginOptions: {
    requireDirective: false,
    identifiers: [{start: 'block:start', end: 'block:end'}],
  },
  fixtures: path.join(__dirname, 'fixtures'),
})
