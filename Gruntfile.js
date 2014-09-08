module.exports = function (grunt) {

    var path = require("path"),
        bootstrap = require("bootstrap-grunt");

    bootstrap(grunt)
        // --------------
        // Initial configuration
        .setConfig({
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n */\n',
            src: {
                docs: "<%= pkg.directories.docs %>",
                css: "<%= pkg.directories.source.css %>",
                js: "<%= pkg.directories.source.js %>",
                specs: "<%= pkg.directories.test.casperjs %>",
                html: "<%= pkg.directories.source.html %>"
            }
        })

        .loadPackageJSON(path.join(__dirname , 'package.json'))

        .loadDevDependencies()

        .loadDependencies()

        .loadConfiguration([path.join(__dirname , 'grunt/*')])

        // init Grunt
        .initConfig();
    // RIP Gruntfile.js
};