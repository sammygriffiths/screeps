const config = require('./config.json');
const rsync = require('./grunt/rsync');
const copy = require('./grunt/copy');
const watch = require('./grunt/watch');

module.exports = (grunt) => {
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.config.init(copy);   
    grunt.config.set('rsync', rsync(config.directory));
    grunt.config.set('watch', watch);

    grunt.registerTask('default', ['clean', 'copy', 'rsync']);
}
