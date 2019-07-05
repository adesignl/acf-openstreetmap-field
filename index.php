<?php

/*
Plugin Name: ACF OpenStreetMap Field
Plugin URI: https://wordpress.org/plugins/acf-openstreetmap-field
Description: A configurable OpenStreetMap Field for ACF.
Author: Jörn Lund
Version: 0.1.14
Author URI: https://github.com/mcguffin
License: GPL3
Text Domain: acf-openstreetmap-field
Domain Path: /languages/
*/

/*  Copyright 2018  Jörn Lund

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/*
Plugin was generated by WP Plugin Scaffold
https://github.com/mcguffin/wp-plugin-scaffold
Command line args were: ``
*/


namespace ACFFieldOpenstreetmap;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}

require_once dirname(__FILE__) . '/include/autoload.php';

Core\Core::instance( __FILE__ );


if ( is_admin() || defined( 'DOING_AJAX' ) ) {

	Settings\SettingsOpenStreetMap::instance();

}
