'use strict';

angular.module('webIHMApp')
    .controller('AccueilCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {


        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
            .success(function(data) {
                $scope.users = data.data;
            });





       if($routeParams.userId) {
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.currentUser = data.data;
                    }
                });
        }

    }]);
