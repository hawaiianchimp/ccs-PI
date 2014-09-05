##Product Information(PI) Event

Get the Product Information for Parter sites.

####Simple Implementation

    var PI = require("PI");

	sitemap.getSites("http://www.cbs.com/sitemaps/show/show_siteMap_index.xml", function(err, sites){
		if(!err)console.log(sites);
		else console.log(error);
	});

