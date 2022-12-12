'use strict';

module.exports = {
  singleQuote: true,
  endOfLine: 'auto',
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html', '**/*.hbs'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
