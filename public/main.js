require.config({
    paths: {
        'jquery': 'vendor/jquery/jquery',
        'io': 'vendor/socket.io',
        'kinetic': 'vendor/kinetic',
        'text': 'vendor/requirejs-text/text',
        'slimscroll': 'vendor/jquery.slimscroll'
    },
    shim: {
        slimscroll: ["jquery"]
    }
});
define([
    'controllers/ui',
    'controllers/login',
    'controllers/chat',
    'controllers/online',
    'controllers/map'
], function () {
});
