module.exports = (directory) => {
    return {
        options: {
            args: ["--verbose", "--checksum"],
            exclude: [".git*"],
            recursive: true
        },
        dist: {
            options: {
                src: './dist/',
                dest: directory,
            }
        },
    }
}
