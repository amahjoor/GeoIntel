require('ts-node').register({
    compilerOptions: {
      module: 'commonjs',
      target: 'es5',
      allowJs: true
    }
  });
  
  module.exports = require('./next.config.ts');