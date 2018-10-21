module.exports = (base_directory, branch) => {
    return {
        options: {
            args: ["--verbose", "--checksum"],
            exclude: [".git*"],
            recursive: true,
            delete: true
        },
        dist: {
            options: {
                src: './dist/',
                dest: base_directory + branch,
            }
        },
    }
}
