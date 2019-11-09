var app = angular.module('myApp', []);

app.controller('employeeCtrl', function ($scope, $http, $location, $anchorScroll) {

    console.clear();


    $scope.editMode = false;
    $scope.messageStyle  = { "float": "right", "color": "green" };
    $scope.editedEmp = "";
    $scope.newemp = {};

    $scope.reset = function () {
        console.clear();
        $scope.messageStyle = { "float": "right", "color": "green" };
        $scope.message = "";
        if ($scope.editMode) {
            $scope.newemp = angular.copy($scope.editedEmp);
        }
        else {
            $scope.newemp = {};
        }

    }

    $scope.get = function () {

        $http.get("/employees")
            .then(function (response) {
                $scope.emps = response.data;
                $scope.newemp = {};
            })
    }



    $scope.saveEmp = function () {
        $http.post("/employees", $scope.newemp)
            .then(function (response) {
                $scope.message = "Saved Successfully";
                $scope.get();
                $scope.goToElement('bottom');
            }, function (error) {
                $scope.message = "Error";
                $scope.messageStyle = { "float": "right", "color": "red" };
                alert("failure message: " + JSON.stringify({ error: error }));
            });

    };

    $scope.deleteEmp = function (emp_id) {
        $http.delete("/employees/" + emp_id)
            .then(function (response) {
                $scope.message = "Deleted Successfully";
                $scope.get();
            }, function (error) {
                $scope.message = "Error";
                $scope.messageStyle = { "float": "right", "color": "red" };
                alert("failure message: " + JSON.stringify({ error: error }));
            });

    };

    $scope.editEmp = function (emp) {
        $scope.editedEmp = angular.copy(emp);
        $scope.newemp = angular.copy(emp);
        $scope.editMode = true;
        $scope.goToElement('top');
    };


    $scope.updateEmp = function () {

        $http.put("/employees/" + $scope.newemp._id, $scope.newemp)
            .then(function (response) {
                $scope.message = "Updated Successfully";
                $scope.get();
                $scope.editMode = false;
                $scope.goToElement('bottom');
            }, function (error) {
                $scope.message = "Error";
                $scope.messageStyle = { "float": "right", "color": "red" };
                alert("failure message: " + JSON.stringify({ error: error }));
            });


    };

    $scope.goToElement = function (id) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(id);
        // call $anchorScroll()
        $anchorScroll();
    };




});