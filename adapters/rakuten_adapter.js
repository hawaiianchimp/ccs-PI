/* 
 * Product Information (PI) Event Adapter Rakuten
 * Adapter to grab attributes and send to Product Information Event
 * requires: PI.js
 * 
 * Sean Burke 10/20/14
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
		           SKey: '32b0440c', 	//subscriber key
		      ProductId: ccs_cc_pi_args['cpn'], //product number
		       SMfgName: ccs_cc_pi_args['mf'] || (p=(s=$("#ProductSummary_divMfgLink").html()) ? s.match(/<b>.+<a.+>(.+)<\/a><\/b>/):null) ? p[1]:null,//manufacturer name
		         SMfgPn: ccs_cc_pi_args['pn'] || (p=(s=$("#ProductSummary_divMfgPartNo").html()) ? s.match(/<b>.+<\/b>(.+)/):null) ? p[1]:null,  //manufacturer part number
		      CatalogId: ccs_cc_pi_args['ccid'], //Catalog ID
		           LCID: ccs_cc_pi_args['lang'],  //Locale ID, language
                 Market: ccs_cc_pi_args['market'],  //market of product, 2 letter region code
		        SEanUpc: ccs_cc_pi_args['upcean'],  //UPC/EAN code
		          SkuId: null, 	//sku number CNET SKU ID (CDSID)
		            upc: (p=(s=$("#ProductSummary_divUPC").html()) ? s.trim().match(/<b>.+<\/b>[^\d]+(\d+)/):null) ? p[1]:null, 	//upc code
		          upc14: null, 	//upc14 code
		           isbn: null, 	//isbn number
		   	  userAgent: window.navigator.userAgent,  //user agent of browser
			  	 ProdId: null,  //Product ID that is grabbed from page 
			  	 ProdMf: null,  //Product Manufacturer grabbed from page
		       ProdName: $(".pr-hidden-title").text(), 	//name of product
	           ProdDesc: null, //$("#product_short_description [itemprop='description']").text(), 	//description of product
		      ProdModel: null, //$("[itemtype$='Product'] [itemprop='model']").attr("content"), 	//model number
		      ProdImage: null, //$("[itemtype$='Product'] [itemprop='image']").attr("content"), 	//product image
		   ProdCategory: $("#divBreadCrumbs").text().trim().split(/\s{4}/).join("|"), 	//category of product as an Array
		   		 oiqCat: ccs_cc_pi_args['oiq_addPageCat'],
		   oiqLifecycle: ccs_cc_pi_args['oiq_addPageLifecycle'],
		      ProdPrice: (p=$("#spanMainTotalPrice").text().match(/([\d\.,]+)/)) ? p[1]:null, 	//price of product
		  priceCurrency: null, 	//unit of price, e.g. USD
		    priceSymbol: (p=$("#spanMainTotalPrice").text().match(/(.)[\s]*([\d\.,]+)/)) ? p[1] : null,  //symbol of price, e.g. $
		priceValidUntil: null, 	//date of current price 
		   availability: (p=$("#spanStockStatus").text().match(/[^:]+/)) ? p[0] : null, 	//availability of product
		  itemCondition: $("#marketplaceItemCondition").text(), 	//condition of product
	};
	var ccs_pi = new PI(adapter); //create the PI object
	ccs_pi.send(); //send the PI object to hive

})();