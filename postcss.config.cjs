module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true
      }
    }),
    require('postcss-combine-media-query'),
    require('postcss-sort-media-queries')({
      sort: 'desktop-first'
    }),
    require('postcss-combine-duplicated-selectors')
  ]
}
