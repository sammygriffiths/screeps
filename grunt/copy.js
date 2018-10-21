module.exports = {
    clean: {
        'dist': ['dist']
    },
    copy: {
        // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
        default: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/',
                filter: 'isFile',
                rename: (dest, src) => {
                    // Change the path name utilize underscores for folders
                    return dest + src.replace('/', '_');
                }
            }],
        }
    },
};
