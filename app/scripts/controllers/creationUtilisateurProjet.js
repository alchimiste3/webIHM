'use strict';

angular.module('webIHMApp')
    .controller('CreationCtrl', ['$scope', '$http', '$routeParams','Creation', function ($scope, $http, $routeParams,Creation) {


        $scope.type = ['Utilisateur', 'Projet'];

        $scope.typeElementsUser = ['id', 'name', 'surname'];

        $scope.typeElementsProjet = ['id', 'title'];

        $scope.erreurProject = false;

        $scope.erreurUser = false;

        $scope.creationUser = function(userName, userSurname,userEmail,userWebSite){

            var success = function(data){
                $scope.erreurUser = false;
                $scope.returnCreationUser = data;
            }

            var unsuccess = function(data){
                $scope.erreurUser = true;
            }

            Creation.creationUser1(userName,userSurname,userEmail,userWebSite, success, unsuccess);


        };

        $scope.creationProjet = function(projectTitle, projectDescription,projectYear){

            var success = function(data){
                $scope.returnCreationProject = data;
            }

            var unsuccess = function(data){
                $scope.erreurProject = true;
            }

            Creation.creationProject1(projectTitle,projectDescription,projectYear, success, unsuccess);


        };


    }]);
