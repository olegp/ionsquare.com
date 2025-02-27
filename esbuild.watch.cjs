const esbuild = require('esbuild');

// Start esbuild with watch mode
const ctx = esbuild.context({
  entryPoints: ['./src/index.js'],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['es2018'],
  outfile: './site/assets/dist/bundle.js',
}).catch(() => process.exit(1));

ctx.then(context => {
  context.watch();
  console.log('Watching for changes...');
});
