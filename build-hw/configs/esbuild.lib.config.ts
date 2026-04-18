import * as esbuild from 'esbuild';

const args = new Set(process.argv.slice(2));
const isWatch = args.has('--watch');
const mode = args.has('--mode=prod') ? 'prod' : 'dev';
const isProd = mode === 'prod';

const common: esbuild.BuildOptions = {
  entryPoints: ['build-hw/lib/index.ts', 'build-hw/lib/math.ts', 'build-hw/lib/string.ts'],
  bundle: true,
  outbase: 'build-hw/lib',
  sourcemap: true,
  minify: isProd,
  treeShaking: true,
  external: ['react', 'lodash'],
  platform: 'neutral',
  target: ['es2022'],
  logLevel: 'info',
};

const runBuild = async (format: 'esm' | 'cjs'): Promise<void> => {
  const outdir = format === 'esm' ? 'build-hw/dist/lib/esm' : 'build-hw/dist/lib/cjs';
  await esbuild.build({
    ...common,
    format,
    outdir,
  });
};

const run = async (): Promise<void> => {
  if (isWatch) {
    const esmCtx = await esbuild.context({ ...common, format: 'esm', outdir: 'build-hw/dist/lib/esm' });
    const cjsCtx = await esbuild.context({ ...common, format: 'cjs', outdir: 'build-hw/dist/lib/cjs' });
    await Promise.all([esmCtx.watch(), cjsCtx.watch()]);
    console.log(`[esbuild:lib] watch mode (${mode}) started`);
    return;
  }

  await Promise.all([runBuild('esm'), runBuild('cjs')]);
  console.log(`[esbuild:lib] build completed (${mode})`);
};

run();
