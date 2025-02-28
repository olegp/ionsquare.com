const esbuild = require('esbuild');

const ctx = esbuild.context({
  entryPoints: ['./src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2018'],
  outfile: './site/assets/js/script.js',
}).catch(() => process.exit(1));

ctx.then(context => {
  context.watch();
  console.log('Watching for changes...');
});
