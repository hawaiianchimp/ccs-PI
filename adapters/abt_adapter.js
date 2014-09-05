/* 
 * Product Information (PI) Event Adapter
 * Adapter to grab attributes and send to Product Information Event
 * requires: PI.js
 * 
 * Sean Burke 8/7/14
 */

(function(){
	var c,s,t;
	ccs_cc_pi_args = {};
	if(s=(c=$("#cnet-content-solutions").prev()) ? c.text().match(/\['(\w+)', '(\w+)']/g): null)
	{
		Array.prototype.forEach.call(s, function(el,i,array){ 
			t = el.match(/\['(\w+)', '(\w+)']/);
			ccs_cc_pi_args[t[1]] = t[2];
		});
	}
	var adapter= {
		           SKey: 'a62b622d', 	//subscriber key
		      ProductId: ccs_cc_args['cpn'] || ccs_cc_pi_args['cpn'], //product number
		       SMfgName: ccs_cc_args['mf'] || ccs_cc_pi_args['mf'] || $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"), //manufacturer name
		         SMfgPn: ccs_cc_args['pn'] || ccs_cc_pi_args['pn'] || $("[itemtype$='Product'] [itemprop='model']").attr("content"),  //manufacturer part number
		      CatalogId: ccs_cc_args['ccid'] || ccs_cc_pi_args['ccid'], //Catalog ID
		           LCID: ccs_cc_args['lang'] || ccs_cc_pi_args['lang'],  //Locale ID, language
                 Market: ccs_cc_args['market'] || ccs_cc_pi_args['market'],  //market of product, 2 letter region code
		        SEanUpc: ccs_cc_args['upcean'] || ccs_cc_pi_args['upcean'],  //UPC/EAN code
		          SkuId: null, 	//sku number CNET SKU ID (CDSID)
		            upc: $("[itemtype$='Product'] [itemprop='productID']").attr("content").match(/[0-9]+/)[0], 	//upc code
		          upc14: null, 	//upc14 code
		           isbn: null, 	//isbn number
		   	  userAgent: null,  //user agent of browser
			  	 ProdId: $("[itemtype$='Product'] [itemprop='productID']").attr("content"),  //Product ID that is grabbed from page 
			  	 ProdMf: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),  //Product Manufacturer grabbed from page
		       ProdName: $("[itemtype$='Product'] [itemprop='name']").text(), 	//name of product
	           ProdDesc: null, //$("#product_short_description [itemprop='description']").text(), 	//description of product
		      ProdModel: null, //$("[itemtype$='Product'] [itemprop='model']").attr("content"), 	//model number
		      ProdImage: null, //$("[itemtype$='Product'] [itemprop='image']").attr("content"), 	//product image
		   ProdCategory: $("[itemprop=breadcrumb]").text().replace(/\s/gi,' ').split(">").join("|"), 	//category of product as an Array
		      ProdPrice: $("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)[1], 	//price of product
		  priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"), 	//unit of price, e.g. USD
		    priceSymbol: $("[itemtype$='Product'] [itemprop='price']").text().match(/(.)[\s]*([\d\.,]+)/)[1],  //symbol of price, e.g. $
		priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text(), 	//date of current price 
		   availability: $("[itemprop='availability']").attr("href").match(/schema\.org\/(.+)/)[1], 	//availability of product
		  itemCondition: $("[itemprop='itemCondition']").attr("href").match(/schema\.org\/(.+)/)[1], 	//condition of product
	};
	ccs_pi = new PI(adapter); //create the PI object
	ccs_pi.send(); //send the PI object to hive

})();