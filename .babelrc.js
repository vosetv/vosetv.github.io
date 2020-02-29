const isTest = String(process.env.NODE_ENV) === 'test';
const isDev = String(process.env.NODE_ENV) === 'development';

module.exports =
   (isTest || isDev)
    ? {
        plugins: [
          'react-hot-loader/babel',
          '@babel/plugin-proposal-class-properties',
        ],
        presets: [
          '@babel/env',
          '@babel/preset-typescript',
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
