// https://github.com/michael-ciniawsky/postcss-load-config
var env = process.env.ENTRY || 'web' ,
    plugins = {
        "postcss-import": {},
        "postcss-url": {},
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {}
    };

env == 'm'  ?  
plugins["postcss-px-to-viewport"] = {
    viewportWidth: 1125,     // (Number) The width of the viewport.
    viewportHeight: 1334,    // (Number) The height of the viewport.
    unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
    viewportUnit: 'vw',     // (String) Expected units.
    selectorBlackList: ['.ignore', '.hairlin','weui','ql','ivu-radio','mascot','video-js']
} : "";

module.exports = {
  "plugins": plugins
}
