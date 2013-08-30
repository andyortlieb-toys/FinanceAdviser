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

			// Payment Types
			exports.PaymentTypes = {
				Revenue:1,
				Expense:-1
			}

			exports.Account = Class.$extend({
				_type: "Account",
				__init__: function(config){
					
					// A must! Make it an own property for serialization.
					for (var k in {_type:1,name:1,apr:1,balance:1,minpmt:1}){
						this[k] = this[k];
					}
					this.balance = this.balance || this.startbalance || 0;
					config = config || {};
				},

				balanceType: BalanceTypes.Unknown,
				paymentType: PaymentTypes.Expense,

				getBalance: function(){
					return this.balance * this.balanceType;
				},

				getPayment: function(){
					return this.minpmt * this.paymentType;
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
				minpmt: 0,
				// @prop
				limit: null

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

			exports.accounts.CreditCard = Account.$extend({
				_type: "CreditCard",
				balanceType:BalanceTypes.Liability
			});

			exports.accounts.Revenue = Account.$extend({
				_type: "Revenue",
				balanceType:BalanceTypes.Unknown,
				paymentType: PaymentTypes.Revenue
			});

			exports.accounts.BudgetItem = Account.$extend({
				_type: "BudgetItem",
				balanceType:BalanceTypes.Unknown
			});

			exports.accounts.Allowance = Account.$extend({
				_type: "Allowance",
				balanceType:BalanceTypes.Unknown
			});

			exports.accountTypes = (function(){
				res = []
				for (k in exports.accounts){
					if (exports.accounts[k].prototype._type){
						res.push(exports.accounts[k].prototype._type);
					}
				}
				return res;
			})();

			exports.initAccount = function(accountobj){
				var acct = new exports.accounts[accountobj._type];

				for (var k in accountobj){
					acct[k] = accountobj[k];
				}

				return acct;
			}

			exports.initAccounts = function(accountlist){
				newaccounts = [];

				for (var i=0; i<accountlist.length; ++i){
					newaccounts.push(exports.initAccount(accountlist[i]));
				}

				return newaccounts;
			}
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