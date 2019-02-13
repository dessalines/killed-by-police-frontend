const {
  FuseBox,
  Sparky,
  EnvPlugin,
  CSSPlugin,
  WebIndexPlugin,
  QuantumPlugin
} = require('fuse-box');
// const transformInferno = require('../../dist').default
const transformInferno = require('ts-transform-inferno').default;
const transformClasscat = require('ts-transform-classcat').default;
let fuse, app;
let isProduction = false;

Sparky.task('config', _ => {
  fuse = new FuseBox({
    homeDir: 'src',
    hash: isProduction,
    output: 'docs/$name.js',
    experimentalFeatures: true,
    cache: !isProduction,
    sourceMaps: !isProduction,
    transformers: {
      before: [transformClasscat(), transformInferno()],
    },
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
      CSSPlugin(),
      WebIndexPlugin({
        title: 'Inferno Typescript FuseBox Example',
        template: 'src/index.html',
        path: "/"
      }),
      isProduction &&
      QuantumPlugin({
        bakeApiIntoBundle: 'app',
        treeshake: true,
        uglify: true,
      }),
    ],
  });
  app = fuse.bundle('app').instructions('>index.tsx');
});
Sparky.task('clean', _ => Sparky.src('docs/').clean('docs/'));
Sparky.task('env', _ => (isProduction = true));
Sparky.task('copy-assets', () => Sparky.src('assets/*.ico').dest('docs/'));
Sparky.task('dev', ['clean', 'config', 'copy-assets'], _ => {
  fuse.dev();
  app.hmr().watch();
  return fuse.run();
});
Sparky.task('prod', ['clean', 'env', 'config', 'copy-assets'], _ => {
  // fuse.dev({ reload: true }); // remove after demo
  return fuse.run();
});
