import * as esbuild from 'esbuild';

async function watch() {
  const ctx = await esbuild.context({
    entryPoints: ['./site/_js/index.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['es2018'],
    outfile: './site/assets/js/script.js',
  });

  await ctx.watch();
  console.log('Watching for changes...');
}

watch();
