Package.describe({
  name: 'peer-deps',
  version: '0.0.1',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');

  api.addFiles('./cheerio.js', ['client', 'server'], { isAsset: true });
  api.addFiles('./lodash.js', ['client', 'server'], { isAsset: true });
  api.addFiles('./react.js', ['client'], { isAsset: true });
  api.addFiles('./react-dom.js', ['client'], { isAsset: true });
  api.addFiles('./react-komposer.js', ['client'], { isAsset: true });
  api.addFiles('./redis.js', ['server'], { isAsset: true });
  api.addFiles('./redux.js', ['client'], { isAsset: true });
  api.addFiles('./url.js', ['client', 'server'], { isAsset: true });
});
