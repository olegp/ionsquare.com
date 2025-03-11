import * as esbuild from 'esbuild';

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['./site/_js/index.js'],
      bundle: true,
      minify: true,
      sourcemap: true,
      target: ['es2018'],
      outfile: './site/assets/js/script.js',
    });
  } catch {
    process.exit(1);
  }
}

build();
