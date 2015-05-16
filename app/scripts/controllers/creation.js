'use strict';

angular.module('webIHMApp')
    .service('Creation',['$http', function Creation($http){

        var mainUrl = 'http://poo-ihm-2015-rest.herokuapp.com/api/';

        /**
         * Permet de creer un nouvel utilisateur et d'executer soit la fonction success soit unsuccess
         *
         * @param userName
         * @param userSurname
         * @param userEmail
         * @param userWebSite
         * @param success
         * @param unsuccess
         */
        this.creationUser1 = function(userName, userSurname,userEmail,userWebSite,success, unsuccess){

            $http.post(mainUrl +'Users/',{
                "name":userName,
                "surname":userSurname,
                "email":userEmail,
                "website":userWebSite

            })
                .success(function(data) {
                    console.log(data);
                    console.log(data.data);

                    if(data.status == 'error'){
                        unsuccess(data);
                    }
                    else{
                        success(data);

                    }


                })
                .error();
        }

        /**
         * Permet de creer un nouveau projet et d'executer soit la fonction success soit unsuccess
         *
         * @param projectTitle
         * @param description
         * @param year
         * @param success
         * @param unsuccess
         */
        this.creationProject1 = function(projectTitle, description,year,success, unsuccess){

            $http.post(mainUrl +'Projects/',{
                "title":projectTitle,
                "description":description,
                "year":year

            })
                .success(function(data) {
                    console.log(data);
                    console.log(data.data);

                    if(data.status == 'error'){
                        unsuccess(data);
                    }
                    if(data.status == 'success'){
                        success(data);

                    }



                })
                .error();
        }

        /**
         * Permet de creer un nouvelle role et d'executer success
         *
         * @param name
         * @param UserId
         * @param ProjectId
         * @param success
         */
        this.creationRole = function(name, UserId, ProjectId, success){
            $http.post(mainUrl +'Roles/',{
                "name":name,
                "UserId":UserId,
                "ProjectId":ProjectId

            })
                .success(function(data) {
                    console.log(data);
                    console.log(data.data);

                    success();


                })
                .error();
        }

    }]

);

