module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var base = 'app';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: grunt.file.readJSON('bowercopy.json'),
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [ base ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [ base + '/js/*.js', "!" + base + "/js/bundle.js", "!" + base + "/js/bundle.min.js" ]
    },
    jsonlint: {
      pkg: [ 'package.json' ],
      bower: [ '{bower,bowercopy}.json' ]
    },
    browserify: {
      js: {
	src:[ base + "/js/main.js"],
	dest: base + "/js/bundle.js",
	options: {
	  debug:true
	}
      }
    },

    uglify: {
      my_target: {
	files: {
          'app/js/bundle.min.js': [base + '/js/vendor/*.js', base + '/js/bundle.js']
	}
      }
    },
    
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['build']
      },
      json: {
        files: [
          '{package,bower}.json'
        ],
        tasks: ['jsonlint']
      },

      reload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= watch.js.files %>',
          '<%= watch.json.files %>',
          base + '/css/**/*.css',
          '**/*.html'
        ]
      }
    }
  });

  grunt.registerTask('build', ['buildPreloader', 'browserify', 'uglify']);
  grunt.registerTask('serve', function () {
    grunt.task.run([
      'build',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('buildPreloader', 'builds the preloader', function() {
    var images = grunt.file.expand('app/img/*.png');
    var gameStates = [];
    console.log(images);
    var bootstrapper = grunt.file.read('app/js/preloader.js.tpl');
    bootstrapper = grunt.template.process(bootstrapper,{data: {images:images}});
    grunt.file.write('app/js/preloader.js', bootstrapper);
  });


  grunt.registerTask('default', ['newer:jsonlint', 'newer:jshint', 'serve']);
};
