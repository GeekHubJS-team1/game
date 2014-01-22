module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./public",
                    name: 'vendor/almond/almond',
                    mainConfigFile: 'public/main.js',
                    include: ['main'],
                    insertRequire: ['main'],
                    findNestedDependencies: false,
                    cjsTranslate: false,
                    optimize: 'uglify2',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    out: 'public/all.min.js'
                }
            }
        },
        stylus: {
            options: {
                use : [
                    require('csso-stylus')
                ]
            },
            compile: {
                files: {
                    'public/all.min.css': 'public/styles/all.styl'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.registerTask('default', ["requirejs", "stylus"]);
};