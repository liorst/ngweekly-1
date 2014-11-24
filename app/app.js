'use strict';
angular.module('CountryExplorer', [])
  .factory('Countries', function($http){
    var endpoint = 'http://restcountries.eu/rest/v1/name/',
      api = {
        get: function(name){
          var url = endpoint + name + '?fullText=true';
          return $http.get(url).then(function(response){
            return response.data[0];
          });
        }
      };
    return api;
  })
  .controller('MainCtrl', function($scope, Countries){
    //initialize the object with some data
    $scope.country = {
        name:'Jamaica',
        region:'America',
        famousPerson: 'Usain Bolt'
        //Some more default data data
      };
    $scope.input = {
      country: $scope.country,
      show:'end'
    };
    $scope.playGame = function(){
      delete $scope.input.guess;
      if($scope.input.guess.length > 2){
        $scope.input.show = 'guess';
        $scope.result = false;
      }
    };
    function finishGame(result){
      $scope.play = false;
      $scope.input.show = 'end';
      $scope.result = result;
    }
    $scope.restartGame = function(){
      $scope.input.guess = null;
      $scope.input.show = 'play';
      $scope.play = true;
    };

    $scope.getThatData = function(){
      Countries.get($scope.input.country.name).then(function(country){
        //Do something with response
        $scope.country = country;
        finishGame(country.capital);
      }, function(){
        finishGame(null);
      });
    };
  });
