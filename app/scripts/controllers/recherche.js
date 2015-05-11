

'use strict';

angular.module('webIHMApp')
    .service('Recherche',['$http', function Modification($http){

        var mainUrl = 'http://poo-ihm-2015-rest.herokuapp.com/api/';

        ///////////////////////// User //////////////////////////


        this.rechercheAllUsers = function(success){

            $http.get(mainUrl + 'Users')
                .success(function(data) {
                    success(data);

                }
            );

        }

        this.rechercheUsersById = function(idUser, success){

            $http.get(mainUrl + 'Users/'+idUser)
                .success(function(data) {
                    success(data);

                }
            );

        }

        this.rechercheRolesPourUser = function(idUser, success){
            $http.get(mainUrl + 'Users/'+idUser+'/Roles')
                .success(function(data) {
                    success(data);
                }
            );





        };


        ////////////////////////// Project ///////////////////


        this.rechercheAllProjects = function(success){

            $http.get(mainUrl + 'Projects')
                .success(function(data) {
                    success(data);

                }
            );

        }

        this.rechercheProjectsById = function(idProject, success){

            $http.get(mainUrl + 'Projects/'+idProject)
                .success(function(data) {
                    console.log(data.data.title);
                    success(data);

                }
            );

        }

        this.rechercheRolesPourProject = function(idProject, success){

            $http.get(mainUrl + 'Roles?ProjectId=' + idProject)
                .success(function(data) {
                    success(data);
                }
            );

        }








    }]
);

