require('./check-versions')()

process.env.NODE_ENV = 'staging'

const ora = require('ora')
const rm = require('rimraf')
const move = require('glob-move')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const config = require('../config')
const webpack_config = require('./webpack.staging.conf')
const mergeDeepRight = require('ramda/src/mergeDeepRight')

const final_path = path.resolve(__dirname, '../dist')

const spinner = ora('building for staging...')
spinner.start()

rm(webpack_config.output.path, err => {
  if (err) throw err
  webpack(webpack_config, (err, stats) => {
    spinner.stop()

    // webpack errors
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      } else  {
        console.error(err.stack || err)
      }
      process.exit(0)
    }

    // report on build process
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // const info = stats.toJson()
    // if (stats.hasWarnings()) {
    //   console.warn(info.warnings)
    // }

    // if build failed, stop
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    rm(final_path + '/*', err => {
      if (err) throw err

      move(webpack_config.output.path + '/*', final_path)
        .then(() => {
          rm(webpack_config.output.path, err => {
            if (err) throw err

            console.log(chalk.cyan('  Build complete.\n'))
            console.log(chalk.yellow(
              '  Tip: built files are meant to be served over an HTTP server.\n' +
              '  Opening index.html over file:// won\'t work.\n'
            ))
          })
        })
        .catch(err => {
          throw err
        })
    })
  })
})
