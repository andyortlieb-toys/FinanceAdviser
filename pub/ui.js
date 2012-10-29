//;(function(){


	accounts = [];

	pnlAcctSetup = document.querySelector('#pnlAcctSetup');
	pnlAcctSetup.type = document.querySelector('#inpAcctType');
	pnlAcctSetup.name = document.querySelector('#inpAcctName');
	pnlAcctSetup.startbalance = document.querySelector('#inpAcctStartBalance');
	pnlAcctSetup.apr = document.querySelector('#inpAcctAPR');
	pnlAcctSetup.minpmt = document.querySelector('#inpAcctMinpmt');

	pnlAcctCreate = document.querySelector('#pnlAcctCreate');

	pnlAccts = document.querySelector('#accounts tbody');

	inpAcctType = document.querySelector('#inpAcctType');

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
		newAcct = new _fa.types.accounts[pnlAcctSetup.type.value]();
		newAcct.name = pnlAcctSetup.name.value;
		newAcct.startbalance = parseFloat(pnlAcctSetup.startbalance.value);
		newAcct.apr = pnlAcctSetup.apr.value;
		newAcct.minpmt = pnlAcctSetup.minpmt.value;

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
		var newEl;
		console.log("STUB: Display account", arguments);
		console.log(JSON.stringify(accounts[id]));
		
		newEl = document.createElement('tr');
		newEl.innerHTML = "<th>"+accounts[id].name+"</th>";
		newEl.innerHTML += "<td>"+accounts[id]._type+"</td>";
		newEl.innerHTML += "<td>"+accounts[id].startbalance+"</td>";
		newEl.innerHTML += "<td>"+accounts[id].apr+"</td>";
		newEl.innerHTML += "<td>"+accounts[id].minpmt+"</td>";

		pnlAccts.appendChild(newEl);
	
	}


	// onReady type stuff...
	for (var t in _fa.types.accounts){
		inpAcctType.innerHTML+='<option value="'+t+'">'+t+'</option>';
	}


//})();

