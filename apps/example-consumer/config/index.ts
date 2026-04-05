import { defineConfig } from '@tarojs/cli';

export default defineConfig<'webpack5'>(async (merge, { mode }) => {
  const baseConfig = {
    projectName: 'fdesign-example-consumer',
    sourceRoot: 'src',
    outputRoot: 'dist',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
    },
    framework: 'react',
    compiler: 'webpack5',
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      module: {
        postcss: {
          cssModules: {
            enable: true,
            config: {
              namingPattern: 'module',
              generateScopedName: '[name]__[local]___[hash:base64:5]',
            },
          },
        },
      },
    },
  };

  if (mode === 'development') {
    const devConfig = (await import('./dev')).default;
    return merge({}, baseConfig, devConfig);
  }

  const prodConfig = (await import('./prod')).default;
  return merge({}, baseConfig, prodConfig);
});
