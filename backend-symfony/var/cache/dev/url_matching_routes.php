<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/login' => [[['_route' => 'app_login', '_controller' => 'App\\Controller\\LoginController::index'], null, null, null, false, false, null]],
        '/logout' => [[['_route' => 'app_logout', '_controller' => 'App\\Controller\\LogoutController::index'], null, null, null, false, false, null]],
        '/api/products' => [
            [['_route' => 'products_list', '_controller' => 'App\\Controller\\ProductController::indexAction'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'create_product', '_controller' => 'App\\Controller\\ProductController::createAction'], null, ['POST' => 0], null, false, false, null],
        ],
        '/registration' => [[['_route' => 'app_registration', '_controller' => 'App\\Controller\\RegistrationController::index'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api/product/([^/]++)(*:28)'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:63)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        28 => [[['_route' => 'delete_product', '_controller' => 'App\\Controller\\ProductController::deleteAction'], ['id'], ['DELETE' => 0], null, false, true, null]],
        63 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
