/* 
 * Product Information (PI) Event for pixmania
 * library for sending product information to ccs hive
 * requires: adapter.js 
 * 
 * Sean Burke 10/20/14
 */
"use strict";
(function(){
	var PI = function(input)
	{
		/* 
		 * initialize the PI Object
		 */

		this.input = input;
		this.product = {};

		if(input)
		{
			           this.product.SKey = input.SKey;
			      this.product.ProductId = input.ProductId;
			       this.product.SMfgName = input.SMfgName;
			         this.product.SMfgPn = input.SMfgPn;
			      this.product.CatalogId = input.CatalogId;
			           this.product.LCID = input.LCID;
			         this.product.Market = input.Market;
			        this.product.SEanUpc = input.SEanUpc;
			          this.product.SkuId = input.SkuId;
			            this.product.upc = input.upc;
			          this.product.upc14 = input.upc14;
			           this.product.isbn = input.isbn;
			          this.product.MfgId = input.MfgId;
			          this.product.MfgPn = input.MfgPn;
			      this.product.userAgent = input.userAgent;
			         this.product.ProdId = input.ProdId;
			         this.product.ProdMf = input.ProdMf;
			       this.product.ProdName = input.ProdName;
			       this.product.ProdDesc = input.ProdDesc;
			      this.product.ProdModel = input.ProdModel;
			      this.product.ProdImage = input.ProdImage;
			   this.product.ProdCategory = input.ProdCategory;
			      this.product.ProdPrice = input.ProdPrice;
			  this.product.priceCurrency = input.priceCurrency;
			    this.product.priceSymbol = input.priceSymbol;
			this.product.priceValidUntil = input.priceValidUntil;
			   this.product.availability = input.availability;
			  this.product.itemCondition = input.itemCondition;
		}


		/* 
		 * Get competitors off of page by looking through scripts
		 */

		this.getCompetitors = function(){
			var temp = Array.prototype.map.call(document.querySelectorAll('script'), function(el,i,array){return el.outerHTML}).join().match(/(flix|sellpoint|webcollage|ccs|answers)/g);
			return (temp) ? temp.filter(function(elem, pos, self) {return self.indexOf(elem) == pos;}) : null;
		};

		this.getCompetitorsWithContent = function(){
			var cwc = [];
			if(document.querySelector("#sp_acp_container"))cwc.push("sellpoint");
			if(document.querySelector("#wc-aplus"))cwc.push("webcollage");
			if(document.querySelector("#inpage_cap_wrapper"))cwc.push("flix");
			if(document.querySelector(".ccs-cc-inline"))cwc.push("ccs");
			return (cwc.length > 0) ? cwc:null;
		};
		this.product.competitorScripts = this.getCompetitors();
		this.product.competitorContent = this.getCompetitorsWithContent();

		/* 
		 * send the PI event using ccs_cc_log variable
		 */

		this.send = function(){
			var _pie = this;
			if(typeof ccs_cc_log !== 'undefined')
			{
				ccs_cc_log.sendEvent("PI", _pie.getParamString(), window.location.href);
			}
		};

		/* 
		 * returns the parameters as a URL Query String
		 */

		this.getParamString= function(){		
			var output = '';
			for(var f in this.product)
			{
				output += (this.product[f]) ? "&" + f + "=" + encodeURIComponent(this.product[f]): '';
			}	
			return output.substring(1);
		};
	};

	/* 
	 * Product Information (PI) Event Adapter for Pixmania
	 * Adapter to grab attributes and send to Product Information Event
	 * requires: PI.js
	 * 
	 * Sean Burke 10/20/14
	 */

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
		       SMfgName: ccs_cc_pi_args['mf'] || $("[itemtype$=Product] [itemprop='brand']").text(), //manufacturer name
		         SMfgPn: ccs_cc_pi_args['pn'] || (p=$("[itemtype$=Product] [itemprop='name']").text()) ? p.match(/\w+/) : null,  //manufacturer part number
		      CatalogId: ccs_cc_pi_args['ccid'], //Catalog ID
		           LCID: ccs_cc_pi_args['lang'],  //Locale ID, language
                 Market: ccs_cc_pi_args['market'],  //market of product, 2 letter region code
		        SEanUpc: ccs_cc_pi_args['upcean'],  //UPC/EAN code
		          SkuId: null, 	//sku number CNET SKU ID (CDSID)
		            upc: (p=(s=$("[itemtype$='Product'] [itemprop='name']").text())? s.match(/\w+/) : null) ? p[0]:null, 	//upc code
		          upc14: null, 	//upc14 code
		           isbn: null, 	//isbn number
		   	  userAgent: null,  //user agent of browser
			  	 ProdId: $("[itemtype$='Product'] [itemprop='productID']").attr("content") || null,  //Product ID that is grabbed from page 
			  	 ProdMf: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),  //Product Manufacturer grabbed from page
		       ProdName: $("[itemtype$='Product'] [itemprop='name']").text(), 	//name of product
	           ProdDesc: null, //$("#product_short_description [itemprop='description']").text(), 	//description of product
		      ProdModel: null, //$("[itemtype$='Product'] [itemprop='model']").attr("content"), 	//model number
		      ProdImage: null, //$("[itemtype$='Product'] [itemprop='image']").attr("content"), 	//product image
		   ProdCategory: $("[itemprop=breadcrumb]").text().replace(/\s{2}/gi,'').split("|").join("|"), 	//category of product as an Array
		   		 oiqCat: null,  //owneriq.net category
   		   oiqLifecycle: null,  //owneriq.net LifeCycle
		      ProdPrice: (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1] : null, 	//price of product
		  priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"), 	//unit of price, e.g. USD
		    priceSymbol: (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/[^\s\d\.,]+/)) ? p[0] : null,  //symbol of price, e.g. $
		priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text() || null, 	//date of current price 
		   availability: (p=(s=$("[itemprop='availability']").attr("href")) ? s.match(/schema\.org\/(.+)/) : null) ? p[1] : null, 	//availability of product
		  itemCondition: (p=(s=$("[itemprop='itemCondition']").attr("href")) ? s.match(/schema\.org\/(.+)/) : null) ? p[1] : null, 	//condition of product
	};
	var ccs_pi = new PI(adapter); //create the PI object
	ccs_pi.send(); //send the PI object to hive

})();