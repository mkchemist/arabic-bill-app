const path = require("path")
const child_process = require("child_process")
const url = require("url")
const electron = require("electron")
const webpack = require("webpack")
const webpackConfig = require("./webpack.config")


let isAppStarted = false;

let bundler = webpack(webpackConfig);


let watcher = bundler.watch({}, (err, stats) => {
    if(err) {
        console.log(err)
    }

    if(!isAppStarted) {
        isAppStarted = true
        child_process.spawn(electron, ["."])
        .on('close', () => {
            watcher.close()
        })
    }

    if(stats !== null) {
        console.log(`[Log][${new Date()}] App recompiled`);
    }
})