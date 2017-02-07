/* Additions, removals and modifications of external less and pug files are expected 
in the future. That is what we call an update. An update will be hosted in a folder 
whose name starts with the letter v (meaning version) followed by a number. The 
frequency of such updates is not determined at this stage. */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        less: {
            development: {
                files: [{
                    src: ['components/**/*.less'],
                    ext: '.css',
                    expand: true
                }]
            }
        },


        pug: {
            development: {
                files: [{
                    src: 'components/**/*.pug',
                    expand: true,
                    ext: '.html',
                }]
            }
        },


        watch: {
            options: {
                reload: true
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

    grunt.registerTask('functions', function () {
        require('./node_modules/functions/Iterator.js');
    });

    // loads plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default task(s).
    grunt.registerTask('default', ['watch']);
};
