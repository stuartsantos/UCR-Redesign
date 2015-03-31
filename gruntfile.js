module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dynamic_mappings: {
        // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'src/js',      // Src matches are relative to this path.
            src: ['*.js'], // Actual pattern(s) to match.
            dest: 'build/js',   // Destination path prefix.
            ext: '.min.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          }
        ]
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sourcemap: true
        }
      }
    },
    htmlmin: {                                     // Task
      multiple: {
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },                                // Target
        files: [{                                  // Dictionary of files
          expand: true,
          cwd: 'src/html',                             // Project root
          src: ['*.html', '**/*.html'],                        // Source
          dest: 'build/'                            // Destination
        }]
      }
    },
    criticalcss: {
      custom: {
        options: {
          url: "http://localhost:4000",
          width: 1200,
          height: 900,
          outputfile: "build/css/critical.css",
          filename: "build/css/styles.css", // Using path.resolve( path.join( ... ) ) is a good idea here
          buffer: 800*1024
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          hostname: 'localhost',
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify']
      },
      css: {
        files: ['src/sass/*.scss', 'src/sass/**/*.scss', 'config.rb'],
        tasks: ['compass']
      },
      html: {
        files: ['src/html/*.html', 'src/html/**/*.html'],
        tasks: ['newer:htmlmin']
      }
    },
    browserSync: {
      bsFiles: {
        src : [
          'build/*.html',
          'build/**/*.html',
          'build/js/*.js',
          'build/css/*.css'
        ]
      },
      options: {
          watchTask: true,
          server: './build'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('critical', ['connect', 'criticalcss']);

};
