const config = require('./config.json');
const branch = require('git-branch');

const rsync = require('./grunt/rsync');
const copy = require('./grunt/copy');
const watch = require('./grunt/watch');

module.exports = (grunt) => {
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.config.init(copy);   
    grunt.config.set('watch', watch);

    grunt.registerTask('default', 'The default task', async function() {
        let done = this.async();
        let gitBranch = await branch();
        let screepsBranch = (gitBranch !== 'master') ? gitBranch : 'default';
        grunt.config.set('rsync', rsync(config.screeps_files_base_directory, screepsBranch.replace('/', '_')));

        grunt.task.run(['clean', 'copy', 'rsync']);
        done();
    });
}
