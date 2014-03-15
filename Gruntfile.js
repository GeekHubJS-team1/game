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
        less: {
            production: {
                options: {
                    paths: ["public/styles"],
                    compress: true,
                    sourceMap: true,
                    sourceMapFilename: "public/all.min.css.map",
                    sourceMapBasepath: 'public'
                },
                files: {
                    "public/all.min.css": "public/styles/all.less"
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'public/all.html': ['public/index.html']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.registerTask('default', ["requirejs", "less"]);
    grunt.registerTask('build', ["requirejs", "less", "processhtml"]);
};
