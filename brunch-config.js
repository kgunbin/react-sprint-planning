module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'js/server.js': /^app\/server/,
        'js/app.js': /^app\/(client|shared)/,
        'js/vendor.js': /^(?!app)/,
        'test/js/test.js': /^test/
       }
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^app\/client/,
        'test/css/test.css': /^test/
      }
    }
  },
  server: {
    path: 'app/server/index.js',
    port: process.env.RSP_PORT || 3009
  },
  plugins: {
    babel: {
      presets: ['es2015', 'react', 'stage-0']
    }
  }
};
