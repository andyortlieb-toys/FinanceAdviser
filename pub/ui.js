//;(function(){


	accounts = [];

	pnlAcctSetup = document.querySelector('#pnlAcctSetup');
	pnlAcctSetup.type = document.querySelector('#inpAcctType');
	pnlAcctSetup.balance = document.querySelector('#inpAcctStartBalance');

	pnlAcctCreate = document.querySelector('#pnlAcctCreate');

	function btnAcctCreate(){
		pnlAcctSetup.classList.remove('hidden');
		pnlAcctCreate.classList.add('hidden');
	}

	console.log("FIXME: Not implemented")
	function btnAcctEdit(){
		pnlAcctSetup.classList.remove('hidden');
		pnlAcctCreate.classList.add('hidden');
	}

	function btnAcctSave(id){
		newAcct = new _fa.types[pnlAcctSetup.type.value]();
		newAcct.balance = parseFloat(pnlAcctSetup.balance.value);

		if (id){
			accounts[id] = newAcct;
		} else {
			id = accounts.push(newAcct)-1;
		}
		displayAccount(id);
		btnAcctSetupCancel();
	}

	function btnAcctSetupCancel(){
		pnlAcctCreate.classList.remove('hidden');	
		pnlAcctSetup.classList.add('hidden');
	}

	function displayAccount(id){
		console.log("STUB: Display account", arguments);
		console.log(JSON.stringify(accounts[id]));
	}


//})();

