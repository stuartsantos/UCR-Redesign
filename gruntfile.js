module.exports = function(grunt) {

  // Load html-minifier-terser
  const { minify } = require('html-minifier-terser');

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
    connect: {
      server: {
        options: {
          port: 4000,
          hostname: 'localhost',
        }
      }
    },
    autoprefixer: {
      options: {
        map: true
      },
      your_target: {
        src: 'build/css/styles.css'
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify']
      },
      css: {
        files: ['src/sass/*.scss', 'src/sass/**/*.scss', 'config.rb'],
        tasks: ['compass', 'autoprefixer', 'cssmin']
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Custom htmlmin task using html-minifier-terser
  grunt.registerMultiTask('htmlmin', 'Minify HTML files', async function() {
    const done = this.async();
    const options = this.options({
      removeComments: true,
      collapseWhitespace: true
    });

    let count = 0;
    const promises = this.files.map(async (file) => {
      const src = file.src.filter((filepath) => {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      });

      if (src.length === 0) {
        grunt.log.warn('Destination not written because no source files were found.');
        return;
      }

      const html = grunt.file.read(src[0]);
      try {
        const minified = await minify(html, options);
        grunt.file.write(file.dest, minified);
        count++;
        grunt.log.writeln('File "' + file.dest + '" created.');
      } catch (err) {
        grunt.log.error('Error minifying ' + src[0] + ': ' + err.message);
        done(false);
      }
    });

    await Promise.all(promises);
    grunt.log.ok(count + ' file' + (count === 1 ? '' : 's') + ' minified.');
    done();
  });

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);

};
