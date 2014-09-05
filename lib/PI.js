/* 
 * Product Information (PI) Event
 * library for sending product information to ccs hive
 * requires: adapter.js 
 * 
 * Sean Burke 8/7/14
 */
http = require("http");

var	PI = function(input, document)
	{
		/* 
		 * initialize the PI Object
		 */

		this.input = input;
		this.product = {};
		this.id = 0;
		this.etype = "PI";

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
			           this.product.Host = input.Host;
			      this.product.userAgent = "ccs_crawler";
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

		/* 
		 * send the PI event using http	
		 */

		this.send = function(){
			this.id++;
			var options = {
				method: "GET",
				hostname: 'ws.cnetcontent.com',
				path: '/log?Et=' + this.etype + '&PId=' + this.genGuid() + '&_LogId=' + this.id + '&' + this.getParamString()
			}
			var req = http.request(options, function(res) {
			  res.on('data', function (chunk) {
			    console.log("Success:".success, options.method, options.hostname + options.path)
			  });
			});

			req.on('error', function(e) {
			  console.log('Error:'.error, (""+e.message).error);
			});
			req.end();
		};

		this.genGuid = function () {
			var result, i, j;
			result = '';
			for (j = 0; j < 32; j++) {
				i = Math.floor(Math.random() * 16).toString(16);
				result = result + i;
			}
			return result;
		};
	};


module.exports = PI;