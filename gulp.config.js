'use strict';

const config = {
  src: {
    root: './_src',

    css: {
      root: './_src/css',

      examples: './_src/css/examples'
    },
    js: {
      root: './_src/js',

      examples: './_src/js.examples'
    }
  },

  public: {
    root: './assets',

    css: './assets/css',
    js: './assets/js'
  },

  examples: {
    root: './elements',

    color: './examples/color',
    elements: './examples/elements',
    tools: './examples/tools',
    aria: './examples/wai-aria'
  },

  connect: {
    livereload: true,
    root: ['.'],
    host: 'localhost',
    port: 9876,
    name: 'CapiConf 2019 - The Age of Accessibility - Examples'
  }
};

export default config;
