/* 
 * Product Information (PI) Event Adapter
 * Adapter to grab attributes and send to Product Information Event
 * requires: PI.js
 * 
 * Sean Burke 8/7/14
 */

(function(){
	var adapter= {
		           SKey: null,  //subrscriber key
		      ProductId: null,  //product number
		       SMfgName: null,  //manufacturer name
		         SMfgPn: null,  //manufacturer part number
		      CatalogId: null,  //Catalog ID
		           LCID: null,  //Locale ID, language
                 Market: null,  //market of product, 2 letter region code
		        SEanUpc: null,  //UPC/EAN code
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
		      ProdPrice: null,  //price of product
		  priceCurrency: null,  //unit of price, e.g. USD
		    priceSymbol: null,  //symbol of price, e.g. $
		priceValidUntil: null,  //date of current price 
		   availability: null,  //availability of product
		  itemCondition: null,  //condition of product
	};
	ccs_pi = new PI(adapter); //create the PI object
	ccs_pi.send(); //send the PI object to hive

})();