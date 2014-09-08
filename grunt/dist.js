module.exports = function (grunt, config, bootstrap) {
    grunt.registerTask("dist", "create distribution package", function () {
        grunt.task.run("html2js:dist");

        grunt.task.run("concat:js");
        grunt.task.run("concat:js_templates");
        grunt.task.run("concat:css");

        grunt.task.run("uglify:js");
        grunt.task.run("uglify:js_templates");

        grunt.task.run("cssmin:css");
    });
};