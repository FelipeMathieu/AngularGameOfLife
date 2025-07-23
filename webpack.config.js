const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = {
  ...withModuleFederationPlugin({
    name: "angularGameOfLife",
    exposes: {
      "./Component": "./src/main.single-spa.ts",
    },
    shared: {
      ...shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      }),
    },
  }),
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
};
