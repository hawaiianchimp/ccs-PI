/* 
 * Product Information (PI) Event
 * library for sending product information to ccs hive
 * requires: adapter.js 
 * 
 * Sean Burke 8/7/14
 */

(function(){
	PI = function(input)
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
			if(ccs_cc_log)
			{
				ccs_cc_log.sendEvent("PI", _pie.getParamString(), window.location.href);
			}
			else
			{
				console.log("ccs_cc_log variable not found");
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
})();