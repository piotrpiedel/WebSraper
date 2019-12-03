// Gruntfile.js


// to use run grunt watch in console
module.exports = (grunt) => {
    grunt.initConfig({
        execute: {
            target: {
                src: ['database/mysqlconnection.js']
            }
        },
        watch: {
            scripts: {
                files: ['database/mysqlconnection.js'],
                tasks: ['execute'],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-execute');
};