'use strict';

angular.module('webIHMApp')
    .controller('RechercheCtrl', ['$scope', '$http', '$routeParams','$location', 'Modification', 'Recherche','Suppression', function ($scope, $http, $routeParams, $location, Modification, Recherche,Suppression) {


        $scope.typeRechercheUser = ['id', 'name', 'surname'];

        $scope.typeRechercheProjet = ['id', 'title', 'description'];

        $scope.typeRecherche = ['Utilisateur', 'Projet'];

        $scope.selectedPane = 'user';

        $scope.modificationProj = {};

        $scope.projectById = {};

        $scope.listProjectCurrentUser = [];

        $scope.listUserCurrentProject = [];



        $scope.RolesCurrentUser = {};

        $scope.RolesCurrentProject = {};

        $scope.supprimerSelected = false;

        $scope.supprimerRoleSelected = '';




//////////////////////////// Redirection //////////////////////////

        $scope.go = function ( path ) {
            console.log(path);
            $location.path( path );
        };


////////////////////////////// CSS ////////////////////////


        $scope.styleUserAndProjectLink = {};

        /**
         *
         */
        var styleUserAndProjectLinkSelected = function(){
            $scope.styletitle = {"text-decoration" : "underline","text-align" : "center"};
        }

        /**
         *
         */
        var styleUserAndProjectLinkUnSelected = function(){
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

        /**
         *
         */
        $scope.supprimerSelect = function(){
            $scope.supprimerSelected = true;
        }

        /**
         *
         */
        $scope.supprimerUnSelect = function(){
            $scope.supprimerSelected = false;
        }

        /**
         *
         * @param id
         */
        $scope.supprimerRoleSelect = function(id){
            $scope.supprimerRoleSelected = id;
        }

        /**
         *
         */
        $scope.supprimerRoleUnSelect = function(){
            $scope.supprimerRoleSelected = '';
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


        /**
         * Initialise la liste des utilisateurs
         *
         * @param data
         */
        var initUsers = function(data){
            $scope.users = data.data;
            $scope.currentUser = data.data;
        }

        Recherche.rechercheAllUsers(initUsers);

        /**
         * Initialise la liste de projets
         *
         * @param data
         */
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
         * Permet de rechercher tout les projets et roles en lien avec un utilisateur
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
         * Recherche les role liee à l'id de l'utilisateur
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
         * Sauvegarde les modification sur un utilisateur et met à jour le page web
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
         * Recherche un utilisateur avec un id : met à jour le filter
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

        /**
         * Supprime un utilisateur a partire de son id et met à jour la page web
         *
         * @param id
         */
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


        /**
         * Supprime un role a partire de l'id de l'utilisateur liee a se role
         *
         * @param id
         */
        $scope.supprimerRoleUser = function(id){

            var success = function(){
                $scope.rechercheProjectPourUser(id);
            }

            Suppression.suppressionRole(id,success);
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
         * recherche un projet avec son id : met à jour le filter
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
         * Modifie un projet et met à jour la page web
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
         * recherche tout les utilisateur en lien avec ce projet
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
         * Recherche tout le role liee a l'id du projet
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

        /**
         * supprime un projet à partir d'un id
         *
         * @param id
         */
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


        /**
         * Supprime un role à partir de l'id du projet liee à ce role
         *
         * @param id
         */
        $scope.supprimerRoleProject = function(id){

            var success = function(){
                $scope.rechercheUserPourProject(id);
            }

            Suppression.suppressionRole(id,success);
        }



    }]
);

