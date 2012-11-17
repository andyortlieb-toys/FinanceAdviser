//;(function(){


	accounts = [];

	pnlAcctSetup = document.querySelector('#pnlAcctSetup');
	pnlAcctSetup.type = document.querySelector('#inpAcctType');
	pnlAcctSetup.name = document.querySelector('#inpAcctName');
	pnlAcctSetup.startbalance = document.querySelector('#inpAcctStartBalance');
	pnlAcctSetup.apr = document.querySelector('#inpAcctAPR');
	pnlAcctSetup.minpmt = document.querySelector('#inpAcctMinpmt');
	pnlAcctSetup.acctId = undefined;

	pnlAcctSetup.clear = function(){
		console.log("clear?");
		pnlAcctSetup.acctId = undefined;
		for (var k in {type:1,name:1,startbalance:1,apr:1,minpmt:1}){
			pnlAcctSetup[k].value='';
		}
	}

	pnlAcctCreate = document.querySelector('#pnlAcctCreate');

	pnlAccts = document.querySelector('#accounts tbody');

	inpAcctType = document.querySelector('#inpAcctType');

	function btnAcctCreate(){
		pnlAcctSetup.clear();
		acctEdit();
	}

	function acctEdit(){
		pnlAcctSetup.classList.remove('hidden');
		pnlAcctCreate.classList.add('hidden');
	}

	function btnAcctSave(){
		var id = pnlAcctSetup.acctId;
		console.log(id);
		console.log(pnlAcctSetup.type.value);
		newAcct = new _fa.types.accounts[pnlAcctSetup.type.value]();
		newAcct.name = pnlAcctSetup.name.value;
		newAcct.startbalance = parseFloat(pnlAcctSetup.startbalance.value) || 0;
		newAcct.apr = parseFloat(pnlAcctSetup.apr.value)||0;
		newAcct.minpmt = parseFloat(pnlAcctSetup.minpmt.value)||0;

		if (id!==undefined){
			accounts[id] = newAcct;
		} else {
			id = accounts.push(newAcct)-1;
		}

		localStorage.accounts = JSON.stringify(accounts);

		displayAccount(id);
		btnAcctSetupCancel();
	}

	function btnAcctSetupCancel(){
		pnlAcctCreate.classList.remove('hidden');	
		pnlAcctSetup.classList.add('hidden');
	}

	function displayAccount(id){
		var newEl, exists;
		console.log("STUB: Display account", arguments);
		console.log(JSON.stringify(accounts[id]));
		
		newEl = document.createElement('tr');
		if (accounts[id].ignored){
			newEl.classList.add('ignored');
		}
		newEl.innerHTML = "<th>"+accounts[id].name+"</th>";
		newEl.innerHTML += "<td>"+accounts[id]._type+"</td>";
		newEl.innerHTML += "<td>"+accounts[id].startbalance+"</td>";
		newEl.innerHTML += "<td>"+accounts[id].apr+"</td>";
		newEl.innerHTML += "<td>"+accounts[id].minpmt+"</td>";
		newEl.innerHTML += "<td>" +
			"<button type='button' onclick='editAccount("+id+");'>" +
				"<img src='http://cdn.dustball.com/pencil.png' />" +
			"</button>" +
			"<button type='button' onclick='swapup("+id+");' >" +
				"<img src='http://cdn.dustball.com/arrow_up.png'>" +
			"</button>" +
			"<button type='button' onclick='swapdown("+id+");' >" +
				"<img src='http://cdn.dustball.com/arrow_down.png'>" +
			"</button>" +
			"<button type='button' onclick='removeAcct("+id+");' >" +
				"<img src='http://cdn.dustball.com/delete.png'>" +
			"</button>" +
			"<button type='button' onclick='ignoreAcct("+id+");' >" +
				"<img src='http://cdn.dustball.com/stop.png'>" +
			"</button>" +
		"</td>";

		exists = pnlAccts.children[id];
		pnlAccts.insertBefore(newEl, exists);
		if (exists) { pnlAccts.removeChild(exists); }
	
	}

	function editAccount(id){
		pnlAcctSetup.type.value = accounts[id]._type;
		pnlAcctSetup.name.value = accounts[id].name;
		pnlAcctSetup.startbalance.value = accounts[id].startbalance;
		pnlAcctSetup.apr.value = accounts[id].apr;
		pnlAcctSetup.minpmt.value = accounts[id].minpmt;
		pnlAcctSetup.acctId = id;

		acctEdit();
	}

	function toggleHidden(panel){
		if (Array.prototype.indexOf.call(panel.classList, "hidden") !== -1)
			panel.classList.remove('hidden');
		else
			panel.classList.add('hidden');
		return;
	}

	function saveurl(){
		window.location.hash = JSON.stringify({accounts:accounts});
		console.log("yahbaba");
	}

	function ignoreAcct(idx){
		if (pnlAccts.children[idx].classList.contains('ignored')){
			setNotIgnored(idx);
		} else {
			setIgnored(idx);
		}
	}

	function setIgnored(idx){
		pnlAccts.children[idx].classList.add('ignored');
		accounts[idx].ignored=true;
		localStorage.accounts = JSON.stringify(accounts);

	}

	function setNotIgnored(idx){
		pnlAccts.children[idx].classList.remove('ignored');
		delete accounts[idx].ignored
		localStorage.accounts = JSON.stringify(accounts);

	}

	function project(){
		var netWorth=0;
		var netIncome=0;
		var projectionIncome = 0;

		var months = (parseInt(inpProjYears.value)*12)+parseInt(inpProjMonths.value) 
		console.log(months)
		// Reset the balances.
		for (var i=0;i<accounts.length; ++i){
			accounts[i].balance = accounts[i].startbalance;
		}

		// TODO: Figure out what to do.
		console.log("START")
		for (var m=0; m<months; ++m){

			console.log('\tMonthly Iteration...')
			netWorth = 0;
			netIncome = 0;

			for (var i=0; i<accounts.length; ++i){
				if (accounts[i].ignored) { continue; }
				console.log("\t\taccount iter:", accounts[i].getBalance(), accounts[i].getPayment());
				netWorth += accounts[i].getBalance();
				netIncome += accounts[i].getPayment();
			}
			console.log("\t\tMonthly iter result: Worth:", netWorth, ". Income: ", netIncome);

			projectionIncome += netIncome

		}
		console.log("END, Total Income (gains):", projectionIncome);

	}


	// onReady type stuff...

	// Populate account types dropdown.
	for (var t in _fa.types.accounts){
		inpAcctType.innerHTML+='<option value="'+t+'">'+t+'</option>';
	}
	// Populate years and months combos for projections
	for (i=0;i<160;++i){
		// 160 years should be enough time for you to invest in your childrens' retirement.
		inpProjYears.innerHTML += "<option value="+i+">"+i+"</option>";
	}
	for (i=0;i<11;++i){
		// 160 years should be enough time for you to invest in your childrens' retirement.
		inpProjMonths.innerHTML += "<option value="+i+">"+i+"</option>";
	}

	// Look for hash data.
	try {
		if (window.location.hash)
			if (JSON.parse(window.location.hash.slice(1)).accounts){
				localStorage.accounts = JSON.stringify( JSON.parse(window.location.hash.slice(1)).accounts );
			}

	} catch (e) {
		console.log("Error loadings accounts from URL hashL ", e)
	}
	window.location.hash="";


	// Look for accounts in localstorage, if exists, use them.
	try {
		accounts = JSON.parse(localStorage.accounts);
	} catch (e){
		console.warn("Error loading accounts from localstore: ", e, localStorage.accounts)
	}

	// Display the known accounts
	for (var i=0; i<accounts.length; ++i){
		var acctReplacement = new _fa.types.accounts[accounts[i]._type];
		for (var k in accounts[i]){
			acctReplacement[k] = accounts[i][k];
		}
		accounts[i] = acctReplacement;
		displayAccount(i);
	}



//})();

