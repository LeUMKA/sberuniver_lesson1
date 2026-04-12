import * as esbuild from 'esbuild';

const args = new Set(process.argv.slice(2));
const isWatch = args.has('--watch');
const mode = args.has('--mode=prod') ? 'prod' : 'dev';
const isProd = mode === 'prod';

const appConfig: esbuild.BuildOptions = {
  entryPoints: ['build-hw/app/index.ts'],
  outdir: 'build-hw/dist',
  entryNames: 'app',
  chunkNames: 'chunks/[name]-[hash]',
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2022'],
  sourcemap: true,
  minify: isProd,
  treeShaking: true,
  logLevel: 'info',
};

const run = async (): Promise<void> => {
  if (isWatch) {
    const ctx = await esbuild.context(appConfig);
    await ctx.watch();
    console.log(`[esbuild:app] watch mode (${mode}) started`);
    return;
  }

  await esbuild.build(appConfig);
  console.log(`[esbuild:app] build completed (${mode})`);
};

run();
