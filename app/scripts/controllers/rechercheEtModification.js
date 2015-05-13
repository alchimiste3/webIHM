'use strict';

angular.module('webIHMApp')
    .controller('RechercheCtrl', ['$scope', '$http', '$routeParams','$location', 'Modification', 'Recherche','Suppression', function ($scope, $http, $routeParams, $location, Modification, Recherche,Suppression) {


        $scope.typeRechercheUser = ['id', 'name', 'surname'];

        $scope.typeRechercheProjet = ['id', 'title'];

        $scope.typeRecherche = ['Utilisateur', 'Projet'];

        $scope.selectedPane = 'user';

        $scope.modificationProj = {};

        $scope.projectById = {};

        $scope.listProjectCurrentUser = [];

        $scope.listUserCurrentProject = [];



        $scope.RolesCurrentUser = {};

        $scope.RolesCurrentProject = {};

        $scope.supprimerSelected = false;



        /////////////////////// Redirection //////////////////////////

        $scope.go = function ( path ) {
            console.log(path);
            $location.path( path );
        };


////////////////////////////// CSS ////////////////////////

        var colorUserProjectLink = "blue";


        var styleUserAndProjectLinkSelected = function(){
            $scope.styleUserAndProjectLink = {};
            $scope.styletitle = {"text-decoration" : "underline"};
        }

        var styleUserAndProjectLinkUnSelected = function(){
            $scope.styleUserAndProjectLink = {"color" : colorUserProjectLink};
            $scope.styletitle = {"text-align" : "center"};
        }


        styleUserAndProjectLinkUnSelected();

////////////////////////////// Selected //////////////////

        /**
         *
         * @param pane
         */
        $scope.selectPane = function(pane) {
            $scope.selectedPane = pane;
            $scope.cacherElement();

        };

        /**
         *
         * @param id
         */
        $scope.modificationSelect = function(id){
            $scope.modification = id;


        };

        /**
         *
         */
        $scope.modificationUnSelectUser = function(){

            Recherche.rechercheAllUsers(function (data) {
                $scope.currentUser = data.data;
                $scope.modificationSelect('');

            });

        };

        /**
         *
         */
        $scope.modificationUnSelectProject = function(){


            Recherche.rechercheAllProjects(function (data) {
                $scope.currentProject = data.data;
                $scope.modificationSelect('');
            });

        };

        /**
         *
         * @param id
         */
        $scope.montrerElement = function(id){
            $scope.openElement = id;
            styleUserAndProjectLinkSelected();
        };

        /**
         *
         */
        $scope.cacherElement = function(){
            $scope.openElement = '';
            styleUserAndProjectLinkUnSelected();
        };
        /**
         *
         */
        $scope.displayAllUser = function(){
            $scope.searchedUser = {};
            $scope.selectPane('user');
        }

        /**
         *
         */
        $scope.displayAllProject = function(){
            $scope.searchedProject = {};
            $scope.selectPane('project');
        }

        /**
         *
         * @param id
         */
        $scope.goProject = function(id){
            $scope.selectPane('project');
            $scope.chercherProject('id',id);
            $scope.montrerElement(id);
        }

        /**
         * Redirection vers un utilisateur particulier
         * @param id
         */
        $scope.goUser = function(id){
            $scope.selectPane('user');
            $scope.chercherUser('id',id);
            $scope.montrerElement(id);
        }

        /**
         * Permet de fermer la liste des roles pour un utilisateur ou un projet
         */
        $scope.fermerListRoles = function(){
            $scope.roles = '';
        }

        $scope.supprimerSelect = function(){
            $scope.supprimerSelected = true;
        }

        $scope.supprimerUnSelect = function(){
            $scope.supprimerSelected = false;
        }



////////////////////////////////// filter //////////////////////

        /**
         * Annule tout les filtre pour la recherche d'utilisateurs et de projets
         */
        $scope.filterNull = function() {
            $scope.searchedProject = {};
            $scope.searchedUser = {};
        };



//////////////////////////////// load /////////////////////



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



////////////////////////////////////// Users ///////////////////////////////////

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

        /**
         *
         * @param idUser
         */
        $scope.rechercheProjectPourUser = function(idUser){

            var success = function() {
                $scope.listProjectCurrentUser = [];
                jQuery.each($scope.RolesCurrentUser,function(index,value){
                    rechercheProjectById(index,value.ProjectId);
                });
                $scope.roles = idUser;

            };

            rechercheRolesPourUser(idUser, success);




        };

        /**
         *
         * @param idUser
         * @param successCB
         */
        var rechercheRolesPourUser = function(idUser, successCB){


            var success = function (data) {
                $scope.RolesCurrentUser = data.data;
                successCB();
            }

            Recherche.rechercheRolesPourUser(idUser,success)





        };

        /**
         *
         * @param userId
         * @param userName
         * @param userSurname
         * @param userEmail
         * @param userWebSite
         */
        $scope.sauvModificationUser = function(userId, userName, userSurname, userEmail, userWebSite){
            console.log(userId);

            var success = function(data){
                Recherche.rechercheAllUsers(function (data) {
                    $scope.currentUser = data.data;
                });
            }

            Modification.modificationUserAll(userId, userName, userSurname, userEmail, userWebSite,success);

            $scope.modification = '';




        };


        /**
         *
         * @param index
         * @param id
         */
        var rechercheUserById = function(index,id){

            var success = function(data){
                $scope.listUserCurrentProject[index] = (data.data);
            }

            Recherche.rechercheUsersById(id,success);
        };

        $scope.supprimerUser = function(id){

            var success = function (data){

                Recherche.rechercheAllUsers(function (data) {
                    $scope.currentUser = data.data;
                    $scope.displayAllUser();
                    $scope.supprimerSelected = false;

                });

            }

            Suppression.suppressionUser(id,success);
        }


///////////////////////////////////// Projects //////////////////////////////////

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


        /**
         *
         * @param index
         * @param id
         */
        var rechercheProjectById = function(index,id){

            var success = function(data){
                $scope.listProjectCurrentUser[index] = (data.data);
            }

            Recherche.rechercheProjectsById(id,success);

        };


        /**
         *
         * @param projectId
         * @param projectTitle
         * @param projectDescription
         */
        $scope.sauvModificationProjet = function(projectId,projectTitle, projectDescription){

            var success = function(data){

                Recherche.rechercheAllProjects(function (data) {
                    $scope.currentProject = data.data;
                });
            }

            Modification.modificationProjectAll(projectId, projectTitle, projectDescription,success);

            $scope.modification = '';



        };

        /**
         *
         * @param idProject
         */
        $scope.rechercheUserPourProject = function(idProject){
            console.log(idProject);

            var success = function() {
                $scope.listUserCurrentProject = [];
                jQuery.each($scope.RolesCurrentProject,function(index,value){
                    rechercheUserById(index,value.UserId);
                });

                $scope.roles = idProject;
                console.log($scope.RolesCurrentProject);

            };

            rechercheRolesPourProject(idProject, success);

        };

        /**
         *
         * @param idProject
         * @param successCB
         */
        var rechercheRolesPourProject = function(idProject, successCB){

            var success = function(data){
                $scope.RolesCurrentProject = data.data;
                successCB();
            }

            Recherche.rechercheRolesPourProject(idProject,success);


        };

        $scope.supprimerProject = function(id){

            var success = function (data){

                Recherche.rechercheAllProjects(function (data) {
                    $scope.currentProject = data.data;
                    $scope.displayAllProject();
                    $scope.supprimerSelected = false;

                });

            }

            Suppression.suppressionProject(id,success);
        }



    }]
);

