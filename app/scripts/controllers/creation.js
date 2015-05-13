'use strict';

angular.module('webIHMApp')
    .service('Creation',['$http', function Creation($http){

        var mainUrl = 'http://poo-ihm-2015-rest.herokuapp.com/api/';

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

