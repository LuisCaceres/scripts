module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Concatenates JavaScript files related to the browsing context feature.
        concat: {
            options: {
                separator: '\n\n\n\n',
            },
            dist: {
                src: 'components/browsing context/*/!(test).js',
                dest: 'components/browsing context/browsing context.js',
            },
        },

        // Converts less files into CSS files.
        less: {
            development: {
                files: [{
                    expand: true,
                    ext: '.css',
                    src: ['components/**/*.less']
                }]
            }
        },

        // Converts pug files into HTML files.
        pug: {
            development: {
                files: [{
                    expand: true,
                    ext: '.html',
                    src: 'components/**/*.pug',
                }]
            }
        },


        // Reacts to certain file modifications within the root folder.
        watch: {
            options: {
                reload: true
            },

            concat: {
                files: ['components/Browsing Context/*.js', '!components/Browsing Context/browsing context.js'],
                tasks: ['concat']
            },

            less: {
                files: ['components/**/*.less'],
                tasks: ['less']
            },

            pug: {
                files: ['components/**/*.pug'],
                tasks: ['pug']
            }
        }
    });

    // Introduces global varibles
    // grunt.registerTask('functions', function () {
    //     require('./node_modules/functions/Iterator.js');
    // });

    // loads plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default task(s).
    grunt.registerTask('default', ['watch']);
};