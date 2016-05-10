/*jshint camelcase:false*/

module.exports = function (grunt)
{
      'use strict';

      grunt.loadNpmTasks ('grunt-contrib-watch');
      grunt.loadNpmTasks ('grunt-contrib-connect');
      grunt.loadNpmTasks ('grunt-protractor-webdriver');
      grunt.loadNpmTasks ('grunt-contrib-jshint');
      grunt.loadNpmTasks ('grunt-karma');

      require ('load-grunt-tasks') (grunt);


      var config = {
            app: 'app'
      };

      grunt.initConfig ({
                    config: config,
                    watch: {
                          livereload: {
                                options: {
                                      livereload: '<%= connect.options.livereload %>'
                                },
                                files: ['<%= config.app %>/**/*.html', '<%= config.app %>/**/*.js']
                          }
                    },

                    connect: {
                          options: {
                                port: 9000,
                                livereload: 35729,
                                hostname: '127.0.0.1'
                          },
                          test: {
                                options: {
                                      base: ['app'],
                                      port: 9001
                                }
                          },
                          livereload: {
                                options: {
                                      open: true,
                                      middleware: function (connect)
                                      {
                                            return [connect ().use ('/bower_components', connect.static ('./bower_components')), connect.static (config.app)

                                            ];
                                      }
                                }
                          }
                    },
                    protractor_webdriver: {
                          driver: {
                                options: {
                                      path: 'node_modules/.bin/',
                                      command: 'webdriver-manager start',
                                      keepAlive: true
                                }
                          }
                    },
                    protractor: {
                          options: {
                                configFile: 'test/protractor.config.js',
                                keepAlive: false,
                                noColor: false
                          },
                          chrome: {
                                options: {
                                      args: {
                                            browser: 'chrome'
                                      }
                                }
                          },
                          firefox: {
                                options: {
                                      args: {
                                            browser: 'firefox'
                                      }
                                }
                          },
                          phantomjs: {
                                options: {
                                      args: {
                                            browser: 'phantomjs'
                                      }
                                }
                          }
                    },
                    karma: {
                          options: {
                                configFile: 'test/karma.conf.js'
                          },
                          unit: {
                                singleRun: true
                          },
                          dev: {
                                singleRun: false
                          }
                    },
                    jshint: {
                          default: {
                                options: {
                                      jshintrc: true
                                },
                                files: {
                                      src: ['app/**/*.js', 'test/**/*.js', '!app/bower_components/**/*.js', '!test/features/steps/steps.js']
                                }
                          },
                          verify: {
                                options: {
                                      jshintrc: true
                                },
                                files: {src: ['app/**/*.js', 'test/**/*.js', '!app/bower_components/**/*.js', '!test/features/steps/steps.js']},
                                reporter: 'checkstyle',
                                reporterOutput: 'target/jshint.xml'
                          }
                    }
              }
      );

      grunt.registerTask ('serve', ['connect:livereload', 'watch']);

      grunt.registerTask ('verify', ['jshint:verify', 'karma:unit', 'connect:test', 'protractor_webdriver', 'protractor:firefox']);

      grunt.registerTask ('test:dev', ['karma:dev']);

      grunt.registerTask ('test:e2e', ['connect:test', 'protractor:chrome']);

      grunt.registerTask ('default', ['serve']);
};
