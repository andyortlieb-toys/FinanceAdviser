function FACtrl($scope){
	$scope.accounts = [];

	$scope.readFromLocalStorage = function(){
		$scope.accounts = _fa.types.initAccounts(
			JSON.parse(localStorage.accounts)
		);
	}

	$scope.saveToLocalStorage = function(){
		localStorage.accounts = JSON.stringify($scope.accounts);
	}

	$scope.readFromLocalStorage();

}