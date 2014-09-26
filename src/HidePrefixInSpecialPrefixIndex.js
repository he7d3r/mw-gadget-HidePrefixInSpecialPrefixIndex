/**
 * Hide prefix in [[Special:PrefixIndex]]
 *
 * Adds a checkbox to the form on [[Special:PrefixIndex]].
 * When the form is submitted with this checkbox ticked,
 * the prefix value will be hidden in the output (see also Wikimedia's [[bugzilla:27131]]).
 *
 * @source: [[mw:Snippets/Hide prefix in SpecialPrefixIndex]]
 * @rev: 2
 */
( function ( mw, $ ) {
'use strict';

function hidePrefix() {
	var prefix = $( '#nsfrom' ).val(),
		hideprefixVal = mw.util.getParamValue( 'hideprefix' ),
		// ^ Works only 1.17+
		// Replace with a call to a similar function or create one if you're using 1.16 or lower
		$hideprefixLabel = $( '<label/>', {
			'for': 'hideprefix',
			'text': 'Hide prefix:'
		} ),
		$hideprefixInput = $( '<input/>', {
			'type': 'checkbox',
			'name': 'hideprefix',
			'id': 'hideprefix',
			'value': '1'
		} ),
		$hideprefixRow;
	if ( hideprefixVal === '1' ) {
		$hideprefixInput.attr( 'checked', 'checked' );
	}
	$hideprefixRow = $( '<tr/>' )
		.append( $( '<td/>', {
			'class': 'mw-label',
			'html': $hideprefixLabel
			} ) )
		.append( $( '<td/>', {
			'class': 'mw-input',
			'html': $hideprefixInput
			} ) );
	// Add checkbox
	$( '#nsselect' ).find( ' > tbody:first' ).append( $hideprefixRow );
	// Do it
	if ( prefix && hideprefixVal === '1' ) {
		$( '#mw-prefixindex-list-table' ).find( 'td a' )
		.add( $( '#mw-prefixindex-list' ).find( 'li a' ) )
		/*jshint unused:false */
		.text( function( i, val ) {
			return val.replace( prefix, '' );
                } );
		/*jshint unused:true */
	}
}

/* Check if we are in edit mode and the required modules are available and then customize the toolbar */
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Prefixindex' ) {
	$(hidePrefix);
}

}( mediaWiki, jQuery ) );