/* 
 * Product Information (PI) Event Adapter
 * Adapter to grab attributes and send to Product Information Event
 * requires: PI.js
 * 
 * Sean Burke 8/7/14
 */

(function(){
	var ccs_cc_pi_args = {};
	var c,s,t,p = {};
	if((s=$("script").text().match(/\['([\s\w-]+)', '([\s\w-]+)']/g))?s:null)
	{
		Array.prototype.forEach.call(s, function(el,i,array){ 
			t = el.match(/\['([\s\w-]+)', '([\s\w-]+)']/);
			ccs_cc_pi_args[t[1]] = t[2];
		});
	}
	var adapter= {
		           SKey: null,  //subrscriber key
		      ProductId: ccs_cc_pi_args['cpn'] || null, //product number
		       SMfgName: ccs_cc_pi_args['mf'] || null,//manufacturer name
		         SMfgPn: ccs_cc_pi_args['pn'] || null,  //manufacturer part number
		      CatalogId: ccs_cc_pi_args['ccid'] || null, //Catalog ID
		           LCID: ccs_cc_pi_args['lang'] || null,  //Locale ID, language
                 Market: ccs_cc_pi_args['market'] || null,  //market of product, 2 letter region code
		        SEanUpc: ccs_cc_pi_args['upcean'] || null,  //UPC/EAN code
		          SkuId: null,  //sku number
		            upc: null,  //upc code
		          upc14: null,  //upc14 code
		           isbn: null,  //isbn number
		   	  userAgent: null,  //user agent of browser
			  	 ProdId: null,  //Product ID that is grabbed from page 
			  	 ProdMf: null,  //Product Manufacturer grabbed from page
		       ProdName: null,  //name of product
	           ProdDesc: null,  //description of product
		      ProdModel: null,  //model number
		      ProdImage: null,  //product image
		   ProdCategory: null,  //category of product as an Array
		   		 oiqCat: null,  //owneriq.net category
   		   oiqLifecycle: null,  //owneriq.net LifeCycle
		      ProdPrice: null,  //price of product
		  priceCurrency: null,  //unit of price, e.g. USD
		    priceSymbol: null,  //symbol of price, e.g. $
		priceValidUntil: null,  //date of current price 
		   availability: null,  //availability of product
		  itemCondition: null,  //condition of product
	};
	var ccs_pi = new PI(adapter); //create the PI object
	ccs_pi.send(); //send the PI object to hive

})();