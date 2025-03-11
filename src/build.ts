import * as esbuild from 'esbuild';

const config = {
  entryPoints: ['./site/_js/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2018'],
  outfile: './site/assets/js/script.js',
}

async function build() {
  try {
    if (process.argv.includes('--watch')) {
      const ctx = await esbuild.context(config);

      await ctx.watch();
    } else {
      await esbuild.build(config);
    }
  } catch {
    process.exit(1);
  }
}

build();
