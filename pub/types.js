/*

 @source
 ## Types
 Types for use by FinanceAdviser

 This module is AMD compatible, and also works without it.

*/	

// Self calling anonymous function
(function(){

	/*
		@function
		@private 

		typesLib as a function allows us to decide whether or not to invoke it as AMD.

	*/
	function typesLib(){
		var 
			exports = {accounts:{}}
		;

		with (exports){

			/*
				@object BalanceTypes

			*/
			// Balance Types (Account Types) (Credit/Debit)
			exports.BalanceTypes = {
				Unknown:0,
				Debit:1,
				Credit:-1
			}

			exports.Account = Class.$extend({
				_type: "Account",
				__init__: function(config){
					
					// A must! Make it an own property for serialization.
					for (var k in {_type:1,name:1,apr:1,balance:1,minpmt:1}){
						this[k] = this[k];
					}
					this.balance = this.balance || this.startbalance;
					config = config || {};
					this.balance = config.balance || 0;
				},
				balanceType: BalanceTypes.Unknown,
				procBalance: function(){
					return this.balance * this.balanceType;
				},

				// @prop
				_type: "Account",
				// @prop
				startbalance: 0,
				// @prop
				balance: 0,
				// @prop
				apr: 0,
				// @prop
				minpmt: 0

			});

			exports.accounts.Asset = Account.$extend({
				_type: "Asset",
				balanceType: BalanceTypes.Debit,
				__init__: function(config){
					this.$super();
					console.log("init Asset");
				}
			});

			exports.accounts.Liability = Account.$extend({
				_type: "Liability",
				balanceType: BalanceTypes.Credit
			});

			exports.accounts.Service = Account.$extend({
				_type: "Service",
				balanceType:BalanceTypes.Liability
			});

			exports.accounts.Obligation = Account.$extend({
				_type: "Obligation",
				balanceType:BalanceTypes.Liability
			});

		}

		return exports;
	}

	console.log("FIXME: Test AMD style")
	if (typeof require!=="undefined" && typeof define!=="undefined" ){
		// Do this AMD style:

		define([], typesLib);
		return;

	} else {
		// Do this homebrew style.

		if (typeof _fa ==='undefined') _fa = {};
		_fa.types = typesLib();
		return;
	}


})();