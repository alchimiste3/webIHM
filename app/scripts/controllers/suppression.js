'use strict';

angular.module('webIHMApp')
    .service('Suppression',['$http', function Suppression($http){

        var mainUrl = 'http://poo-ihm-2015-rest.herokuapp.com/api/';

        this.suppressionUser = function(id,success){

            $http.delete(mainUrl +'Users/' + id)
                .success(function(data) {
                    console.log(data);
                    console.log(data.data);
                    success(data);


                })
                .error();
        }

        this.suppressionProject = function(id, success){

            $http.delete(mainUrl +'Projects/' +id)
                .success(function(data) {
                    console.log(data);
                    console.log(data.data);
                    success(data);


                })
                .error();
        }

    }]

);
