export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/.DS_Store","fonts/Akrobat-Black.otf","fonts/Akrobat-Regular.otf","fonts/Akrobat-Thin.otf","fonts/Gilroy-ExtraBold.otf","fonts/Gilroy-Light.otf","img/.DS_Store","img/banner-blue.png","img/bns.jpg","img/ice.jpg","img/logo.png"]),
	mimeTypes: {".png":"image/png",".otf":"font/otf",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-eabf44a9.js","imports":["_app/immutable/start-eabf44a9.js","_app/immutable/chunks/index-8bd12b80.js","_app/immutable/chunks/singletons-1c6cb706.js","_app/immutable/chunks/index-8802614f.js","_app/immutable/chunks/preload-helper-b21cceae.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
