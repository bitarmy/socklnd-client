module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: {
      node: 'dist/node.js',
      browser: 'dist/<%= pkg.name %>.js',
      min: 'dist/<%= pkg.name %>.min.js',
    },

    uglify: {
      build: {
        src: '<%= dist.browser %>',
        dest: '<%= dist.min %>'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      node: {
        src: [
          'src/socklnd.js',
          'src/node.js',
        ],
        dest: 'dist/node.js',
      },

      browser: {
        src: [
          'node_modules/sails.io.js/dist/sails.io.js',
          'src/socklnd.js',
          'src/browser.js',
        ],
        dest: '<%= dist.browser %>',
      },
    },

    copy: {
      example: {
        src: ['<%= dist.browser %>'],
        dest: 'examples/<%= pkg.name %>.js',
        filter: 'isFile',
      },
    },

    watch: {
      src: {
        files: ['src/**/*.js'],
        tasks: ['build','copy'],
        options: {
          //spawn: true,
          //interrupt: true,
        },
      },
      dist: {
        files: ['<%= dist.browser %>'],
        tasks: ['copy'],
        options: {
          //spawn: false,
          //interrupt: true,
        },
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['publish']);
  // Default task(s).

  grunt.registerTask('publish', [
    'build',
    'uglify',
  ]);

  grunt.registerTask('build', [
    'build-node',
    'build-browser',
  ]);

  grunt.registerTask('build-node', [
    'concat:node',
  ]);

  grunt.registerTask('build-browser', [
    'concat:browser',
  ]);

  grunt.registerTask('example', [
    'build',
    'copy',
    'watch:src',
    'watch:dist',
  ]);

  grunt.registerTask('start-watch', ['watch:src']);
  grunt.registerTask('start-babel', ['babel']);
};
