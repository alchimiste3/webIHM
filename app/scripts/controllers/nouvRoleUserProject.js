'use strict';

angular.module('webIHMApp')
    .controller('NouvRoleCtrl', ['$scope', '$http', '$routeParams', '$location', 'Recherche','Creation', function ($scope, $http, $routeParams, $location, Recherche,Creation) {

        $scope.typeRechercheUser = ['id', 'name', 'surname'];

        $scope.typeRechercheProjet = ['id', 'title'];

        $scope.typeRecherche = ['Utilisateur', 'Projet'];

        $scope.currentUser = {"name":"a"};

        $scope.currentProject = {"name":"a"};

        $scope.selectedPane = "user";

        $scope.searchedUser = {};

        $scope.searchedProject = {};

        $scope.ajouterSelected = '';

        $scope.param = $routeParams;


        /////////////////////// Redirection //////////////////////////

        $scope.go = function ( path ) {
            console.log(path);
            $location.path( path );
        };

        ////////////////////////////Creation //////////////////


        $scope.ajouterRole = function(idUser,idProject, role){

            var success = function(){
                console.log('ssqdczscfzeefc');
            }

            Creation.creationRole(role, idUser, idProject, success)
        }


        ////////////////////////// Select ///////////////////////
        /**
         *
         * @param pane
         */
        $scope.selectPane = function(pane) {
            $scope.selectedPane = pane;

        };


        $scope.ajouterSelect = function(id){
            $scope.ajouterSelected = id;
        };



        /////////////////////////Load /////////////////////////////////

        $scope.selectPane($routeParams.type);



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


        /////////////////////Utilisateur ////////////////////////

        /**
         * permet de configurer le filtre pour la liste des utilisateur pendant la recherche
         *
         * @param type
         * @param key
         */
        $scope.chercherUser = function(type,key) {
            $scope.searchedUser = {};
            $scope.searchedUser[type] = key;
            console.log($scope.searchedUser);

        };



        ///////////////////////Projet ///////////////////////////

        /**
         * permet de configurer la liste des projet pandant une recherche
         *
         * @param type
         * @param key
         */
        $scope.chercherProject = function(type,key) {
            $scope.searchedProject = {};
            $scope.searchedProject[type] = key;
            console.log($scope.searchedProject);
        };


    }]);
