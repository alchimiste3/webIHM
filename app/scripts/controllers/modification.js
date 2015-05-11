'use strict';

angular.module('webIHMApp')
    .service('Modification',['$http', function Modification($http){

        this.modificationUserName = function(userId, userName){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId ,{
                "id":userId,
                "name":userName

            })
                .success(function(data) {

                })
                .error();
        }

        this.modificationUserSurname = function(userId, userSurname){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId ,{
                "id":userId,
                "surname":userSurname

            })
                .success(function(data) {

                })
                .error();
        }

        this.modificationUserEmail = function(userId, userEmail){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId ,{
                "id":userId,
                "email":userEmail

            })
                .success(function(data) {

                })
                .error();
        }

        this.modificationUserWebSite = function(userId, userWebSite){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId ,{
                "id":userId,
                "website":userWebSite

            })
                .success(function(data) {

                })
                .error();
        }

        this.modificationUserAll = function(userId, userName, userSurname, userEmail, userWebSite,success){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId ,{
                "id":userId,
                "name":userName,
                "surname":userSurname,
                "email":userEmail,
                "website":userWebSite

            })
                .success(function(data) {
                    success(data);
                })
                .error();
        }


        this.modificationProjectTitle = function(projectId,projectTitle){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId ,{
                "id":projectId,
                "title":projectTitle


            })
                .success(function(data) {

                })
                .error();
        }

        this.modificationProjectDescription = function(projectId,projectDescription){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId ,{
                "id":projectId,
                "description":projectDescription


            })
                .success(function(data) {

                })
                .error();
        }

        this.modificationProjectAll = function(projectId,projectTitle,projectDescription,success){

            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId ,{
                "id":projectId,
                "title":projectTitle,
                "description":projectDescription


            })
                .success(function(data) {
                    success(data);

                })
                .error();
        }
    }]

);


