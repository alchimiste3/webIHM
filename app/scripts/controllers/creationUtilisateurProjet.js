'use strict';

angular.module('webIHMApp')
    .controller('CreationCtrl', ['$scope', '$http', '$routeParams','Creation', function ($scope, $http, $routeParams,Creation) {


        $scope.type = ['Utilisateur', 'Projet'];

        $scope.typeElementsUser = ['id', 'name', 'surname'];

        $scope.typeElementsProjet = ['id', 'title'];

        $scope.erreurProject = false;

        $scope.erreurUser = false;

        $scope.ajouterUser = false;

        $scope.ajouterProject = false;

        $scope.nbUserAdd = 0;

        $scope.nbUserErreur = 0;

        $scope.nbProjectAdd = 0;

        $scope.nbProjectErreur = 0;

        $scope.creationUser = function(userName, userSurname,userEmail,userWebSite){

            var success = function(data){
                $scope.nbUserAdd++;
                $scope.erreurUser = false;
                $scope.ajouterUser = true;
                $scope.returnCreationUser = data;
            }

            var unsuccess = function(data){
                $scope.nbUserErreur++;
                $scope.ajouterUser = false;
                $scope.erreurUser = true;
            }

            Creation.creationUser1(userName,userSurname,userEmail,userWebSite, success, unsuccess);


        };

        $scope.creationProjet = function(projectTitle, projectDescription,projectYear){

            var success = function(data){
                $scope.nbProjectAdd++;
                $scope.returnCreationProject = data;
                $scope.erreurProject = false;
                $scope.ajouterProject = true;

            }

            var unsuccess = function(data){
                $scope.nbProjectErreur++;
                $scope.erreurProject = true;
                $scope.ajouterProject = false;
            }

            Creation.creationProject1(projectTitle,projectDescription,projectYear, success, unsuccess);


        };


    }]);
