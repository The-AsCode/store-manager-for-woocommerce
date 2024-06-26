const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

const entry = {};
[ 'plugin-admin' ].forEach(
	( script ) =>
		( entry[ script ] = path.resolve(
			process.cwd(),
			`assets/src/${ script }.js`
		) )
);

module.exports = {
	...defaultConfig,
	entry,
	output: {
		path: path.join( __dirname, './assets/build' ),
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
