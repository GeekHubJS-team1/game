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
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ["requirejs"]);
};