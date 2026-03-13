const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ignore the Android native build cache to prevent ENOENT watch errors
config.watchFolders = [];
config.resolver.blockList = [
  /android\/.cxx\/.*/,
  /android\/build\/.*/,
  /ios\/build\/.*/,
];

module.exports = config;
