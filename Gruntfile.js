/* Additions, removals and modifications of external less and pug files are expected 
in the future. That is what we call an update. An update will be hosted in a folder 
whose name starts with the letter v (meaning version) followed by a number. The 
frequency of such updates is not determined at this stage. */
var version = 1.1;

var paths = {
    less: {
        external: `../v${version}/less/**/*.less`,
        internal: `input/less/**/*.less`
    }
}

var less = paths.less;

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        less: {
            development: {
                options: {
                    paths: ['input/less', '../less']
                },
                files: [{
                    src: [less.internal],
                    dest: 'output/stylesheets',
                    ext: '.css',
                    expand: true,
                    flatten: true
                }]
            }
        },

        watch: {
            options: {
                reload: true
            },
            less: {
                files: [less.internal],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('create browser host environment', function () {
        require('./browser host environment.js');
    });

    grunt.registerTask('functions', function () {
        require('./node_modules/functions/Iterator.js');
    });

    // loads plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default task(s).
    grunt.registerTask('default', ['watch']);
};

