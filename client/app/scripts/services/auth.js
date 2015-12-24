'use strict';

angular.module('gab')
  .service('auth', function ($http, API_URL, authToken, $window, $q) {

      function authSuccessful(res){
          authToken.setToken(res.token);
       }

      this.login = function(email, password){
          return $http.post(API_URL + 'login', {email:email, password:password})
          .success(authSuccessful);
      };

      this.signup = function(email,password){
          return $http.post(API_URL + 'register', {
              email: email,
              password: password
          }).success(authSuccessful);
      };



// Google auth
      var urlBuilder = [];

      var clientId = '710007462115-pn3o6o926mr9os2t8d16tq91u2q3vdml.apps.googleusercontent.com';

      urlBuilder.push('response_type=code',
                      'client_id=' + clientId,
                      'redirect_uri=' + window.location.origin,
                      'scope=profile email');

    
    
    
      this.googleAuth = function(){

          var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&');
          var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 + ", top=" + ($window.outerWidth - 500) / 2.5;

          var deferred = $q.defer();

          var popup = $window.open(url, '', options);

          $window.focus();

          $window.addEventListener('message', function(event){

              if(event.origin === $window.location.origin){

                  var code = event.data;

                  popup.close();

                  $http.post(API_URL + 'auth/google', {
                      code: code,
                      clientId: clientId,
                      redirectUri: window.location.origin
                  }).success(function(jwt){
                      authSuccessful(jwt);
                      deferred.resolve(jwt);
                  });
              }
          });
          return deferred.promise;
      };

  });
