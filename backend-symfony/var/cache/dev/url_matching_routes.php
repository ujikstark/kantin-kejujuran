<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/canteen' => [
            [['_route' => 'canteen_list', '_controller' => 'App\\Controller\\CanteenController::indexAction'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'canteen_edit', '_controller' => 'App\\Controller\\CanteenController::editAction'], null, ['PUT' => 0], null, false, false, null],
        ],
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
                .'|/api/(?'
                    .'|product/([^/]++)(*:31)'
                    .'|user/([^/]++)/balance(*:59)'
                .')'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:95)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        31 => [[['_route' => 'delete_product', '_controller' => 'App\\Controller\\ProductController::deleteAction'], ['id'], ['DELETE' => 0], null, false, true, null]],
        59 => [[['_route' => 'user_balance', '_controller' => 'App\\Controller\\UserBalanceController::editAction'], ['username'], ['PUT' => 0], null, false, false, null]],
        95 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
