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

	$scope.save = function(){
		console.log("STUB", "Smartly select a storage device.")
		return $scope.saveToLocalStorage();
	}

	$scope.swapup = function(idx){
		console.log("BBUTTTTS");
		var swap = $scope.accounts[idx];
		console.log("dink");
		if (idx > 0){
			console.log("Batmanning");
			$scope.accounts[idx] = $scope.accounts[idx-1];
			$scope.accounts[idx-1] = swap;
			$scope.save();
		}
	}

	$scope.swapdown = function(idx){
		var swap = $scope.accounts[idx];
		console.log("dink");
		if ($scope.accounts.length-1 > idx){
			console.log("Batmanning");
			$scope.accounts[idx] = $scope.accounts[idx+1];
			$scope.accounts[idx+1] = swap;
			$scope.save();
		}
	}


	$scope.readFromLocalStorage();

}