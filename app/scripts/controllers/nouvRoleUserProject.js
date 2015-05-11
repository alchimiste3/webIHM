'use strict';

angular.module('webIHMApp')
    .controller('NouvRoleCtrl', ['$scope', '$http', '$routeParams','Recherche', function ($scope, $http, $routeParams,Recherche) {

        $scope.typeRechercheUser = ['id', 'name', 'surname'];

        $scope.typeRechercheProjet = ['id', 'title'];

        $scope.typeRecherche = ['Utilisateur', 'Projet'];

        $scope.currentUser = {"name":"a"};

        $scope.currentProject = {"name":"a"};


        var initUsers = function(data){
            $scope.users = data.data;
            $scope.currentUser = data.data;
        }

        Recherche.rechercheAllUsers(initUsers);

        var initProjects = function(data){
            $scope.projet = data.data;
            $scope.currentProject = data.data;
        }

        Recherche.rechercheAllProjects(initProjects);

    }]);
