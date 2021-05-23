const withImages = require("next-images");

module.exports = withImages({
  images: {
    domains: ["storage.googleapis.com", "firebasestorage.googleapis.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    config.module.rules.push({ parser: { amd: false } });

    return config;
  },
});
