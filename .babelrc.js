module.exports =
  process.env.BABEL_ENV === 'development'
    ? {
        plugins: [
          'react-hot-loader/babel',
          '@babel/plugin-proposal-class-properties',
        ],
        presets: [
          '@babel/env',
          [
            '@babel/preset-react',
            {
              development: true,
            },
          ],
        ],
      }
    : {
        plugins: [
          [
            'transform-react-remove-prop-types',
            {
              classNameMatchers: ['Component'],
              removeImport: true,
            },
          ],
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-optional-chaining',
        ],
        presets: [
          [
            '@babel/env',
            {
              debug: true,
              shippedProposals: true,
            },
          ],
          /* [ */
          '@babel/react',
          /* { */
          /*   "pragma": "h", */
          /*   "pragmaFrag": "f" */
          /* } */
          /* ] */
        ],
      };
