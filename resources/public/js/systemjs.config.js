(function(global) {
    var map = {
        'app': 'js',
        '@angular': 'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs': 'node_modules/rxjs',
        'ng2-bs3-modal': 'node_modules/ng2-bs3-modal',
        "lodash": "node_modules/lodash/lodash.js",
        "ng2-bootstrap": "node_modules/ng2-bootstrap",
        "angular2-notifications": "node_modules/angular2-notifications",
        "moment": "node_modules/moment",
        "ng2-uploader": "node_modules/ng2-uploader",
        "ng2-dropdown": "node_modules/ng2-dropdown"
    };

    var packages = {
        "app": {defaultExtension: 'js'},
        "rxjs": {defaultExtension: 'js'},
        "angular2-in-memory-web-api": {main: 'index.js', defaultExtension: 'js'},
        "ng2-bs3-modal": {defaultExtension: "js"},
        "ng2-bootstrap": {defaultExtension: "js"},
        "ng2-uploader": {main: "ng2-uploader.js", defaultExtension: "js"},
        "angular2-notifications": {main: "components.js", defaultExtension: "js"},
        "moment": {main: "moment.js", defaultExtension: "js"},
        "ng2-dropdown": { "main": "index.js", "defaultExtension": "js" }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'angular2-notifications',
        'upgrade',
    ];

    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
    }

    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
    }

    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    ngPackageNames.forEach(setPackageConfig);

    var config = {
        map: map,
        packages: packages
    };

    System.config(config);
})(this);