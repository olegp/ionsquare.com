const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./assets/js/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2018'],
  outfile: './assets/dist/bundle.js',
}).catch(() => process.exit(1));
