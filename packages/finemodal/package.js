Package.describe({
    name: 'apotex:finemodal',
    version: '0.0.1',
    summary: 'Yet another (again) implementation of the Boostrap Modal',
    git: 'https://github.com/weasel-science/finemodal',
    documentation: '../../README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.1.1');

    api.use([
        'ecmascript',
        'check',
        'blaze',
        'reactive-var',
        'jquery',
        'underscore',
        'templating'
    ], 'client');

    api.addFiles([
        'FineModal.js',
        'FineModalUtil.js',
        'helpers.html',
        'Stack.js'
    ], 'client');

    api.mainModule('main.js', 'client');
});