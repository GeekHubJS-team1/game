require.config({
    paths: {
        'jquery': 'vendor/jquery/jquery',
        'io': 'vendor/socket.io',
        'kinetic': 'vendor/kinetic',
        'text': 'vendor/requirejs-text/text',
        'slimscroll': 'vendor/jquery.slimscroll'
    }
});
define(['controllers/ui', 'controllers/socket', 'controllers/map'], function () {
});
