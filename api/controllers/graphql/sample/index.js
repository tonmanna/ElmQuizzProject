const resolver = {
    Query: {
        getData: (root, args, context) => {
            return {
                message: "Hello",
                name: "Tonman"
            }
        },

    },
};

module.exports = resolver;