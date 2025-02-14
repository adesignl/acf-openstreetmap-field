(function( $, arg ){

	L.TileLayer.Provider.providers = arg.providers;

	var options = arg.options;
	
	function createMarkers( data, map ) {
		var createEvt = $.Event({
				type: 'acf-osm-map-create-markers'
			}),
			default_marker_config = {};


		$(this).trigger( createEvt );

		// allow to skip map creation
		if ( createEvt.isDefaultPrevented() ) {
			return;
		}

		// markers ...
		if ( arg.options.marker.html !== false ) {
			default_marker_config.icon = L.divIcon({
				html: arg.options.marker.html,
				className: arg.options.marker.className
			});
		} else if ( arg.options.marker.icon !== false ) {
			default_marker_config.icon = new L.icon( arg.options.marker.icon );
		}

		// markers again
		$.each( data.mapMarkers, function( i, markerData ) {
			// add markers
			var marker, createEvt;

			// allow for skipping markers
			createEvt = $.Event( 'acf-osm-map-marker-create' );
			createEvt.map = map;
			createEvt.markerData = markerData;
			createEvt.markerOptions = $.extend( default_marker_config, {
				label: markerData.label
			} );

			$(self).trigger(createEvt)

			if ( createEvt.isDefaultPrevented() ) {
				return;
			}

			marker = L.marker(
					L.latLng( parseFloat( createEvt.markerData.lat ), parseFloat( createEvt.markerData.lng ) ),
					createEvt.markerOptions
				)
				.bindPopup( createEvt.markerOptions.label )
				.addTo( map );

			$(self).trigger('acf-osm-map-marker-created', marker );
		});


	}

	function createLayers( data, map ) {
		var createEvt = $.Event({
				type: 'acf-osm-map-create-layers'
			}),
			maxzoom;

		$(this).trigger( createEvt );

		// allow to skip map creation
		if ( createEvt.isDefaultPrevented() ) {
			return;
		}

		maxzoom = 100;

		// layers ...
		$.each( data.mapLayers, function( i, provider_key ) {

			if ( 'string' !== typeof provider_key ) {
				return;
			}

			var layer_config = options.layer_config[ provider_key.split('.')[0] ] || { options: {} },
				layer = L.tileLayer.provider( provider_key, layer_config.options ).addTo( map );

			layer.providerKey = provider_key;

			if ( !! layer.options.maxZoom ) {
				maxzoom = Math.min( layer.options.maxZoom, maxzoom )
			}
		});
		map.setMaxZoom( maxzoom );
	}
	
	
	$.fn.extend({
		acf_leaflet:function() {

			return this.each( function( i, el ){

				if ( $(this).data( 'acf-osm-map' ) ) {
					return;
				}
				var data = $(this).data(),
					self = this,
					map, maxzoom,
					createEvt = $.Event({
						type: 'acf-osm-map-create'
					}),
					initEvt = $.Event({
						type: 'acf-osm-map-init'
					});

				$(this).trigger( createEvt );

				// allow to skip map creation
				if ( createEvt.isDefaultPrevented() ) {
					return;
				}

				$(this).height(data.height);

				map = L.map( this, {
					scrollWheelZoom: false,
					center: [ data.mapLat, data.mapLng ],
					zoom: data.mapZoom
				} );

				$(this).data( 'acf-osm-map', map );

				$(this).trigger( initEvt, map );

				// allow to skip initialization
				if ( initEvt.isDefaultPrevented() ) {
					return;
				}


				createLayers.apply( this, [ data, map ] );

				createMarkers.apply( this, [ data, map ] );


				// finished!
				$(this).trigger('acf-osm-map-created', map );

			});
		}
	});
	// static mathod
	$.extend({
		acf_leaflet:function() {
			$('[data-map="leaflet"]').acf_leaflet();
		}
	});
	// init all maps
	$(document).ready( $.acf_leaflet );


})( jQuery, acf_osm );
