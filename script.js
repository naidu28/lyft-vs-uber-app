var myApp = angular.module("ridesharingApp", []);

myApp.controller('QueryController', ['$scope', '$http', function($scope, $http) {
	$scope.fromLoc = "";
  $scope.toLoc = "";
  $scope.isUber = false;
  $scope.isLyft = false;
  $scope.return;
  $scope.coords = [];

  $scope.uberUrl = "https://api.uber.com/";

  $scope.ride = function() {

    function googleReq(addr) {
      console.log("hey");
      var api_key = "AIzaSyC2ZBINqE4pBqTl_8dZ2_fGcOcvQ5EdVu4";
      var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";

      $http({
        method: 'GET',
        url: googleUrl + addr + "&key=" + api_key
      }).then(function s(res) {
        $scope.return = res.data;
        $scope.coords.push({
          lat: res.data.results[0].geometry.location.lat,
          long: res.data.results[0].geometry.location.long
        });
      }, function e(res) {
        $scope.return = res.data;
      });
    }

    function uberReq() {
      var server_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOltdLCJzdWIiOiIxYjQwNjQxOS00ZDgxLTRmYjQtOTM0ZS00MGQ5ZTUwZTEzNjUiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjY1Zjk3M2I2LWZhYjQtNGUyZS1hYTk3LTQwYzliNzVhMTE2MiIsImV4cCI6MTQ3NzY4MDE2NCwiaWF0IjoxNDc1MDg4MTY0LCJ1YWN0IjoiN3FDdXZ3SHp3ZkhnV0k0SnBsNzlWMGZneUs2ejd6IiwibmJmIjoxNDc1MDg4MDc0LCJhdWQiOiJ6ZW9acXpoZXNnUDhId0d1SnZEQWFnOXQtUmJPdU9ETSJ9.Vm22PHLIxVKJElgD3ifCfFjff06eEk4LcfUZOxlrjUzxMtrZYavOt7wxR3tJ3xynKqAJj5GQ6AszJJRIl7MNirkbMliqdE7ybKEnAQxXEtvqEbsU4vPygXCid8fuVpDUcyI2OeXluCuVrX04ZbX8wJP3tnXPeqnmc-rMtNebZukfnbva7YQmLwmER6XSfilrzGxfwI5n0lp7x-WtIlITFGhlljtM5fHM9Du_jqp0YMfuRf6-6FktcbkDViuigjivVA3obnx4juK7j7GdjsiD1rwnnIHmJ05b-87k7VUJsDvONFhEfNKKMlQOHQxTquPQWeNgFSzClB5fWoW8W6_Ehw";
    var ext = "/v1/estimates/price?"
    var queryUrl = $scope.uberUrl + ext + "start_latitude=" + $scope.coords[0].lat + "&start_longitude=" + $scope.coords[0].long + "&end_latitude=" + $scope.coords[1].lat + "&end_longitude=" + $scope.coords[0].long;

      $http({
        method: 'GET',
        url: queryUrl,
        headers: {
          "content-type" : "application/json",
          "authorization" : "Bearer " + server_token
        }
      }).then(function s(res) {
        $scope.return = res.data;
      }, function e(res) {
        $scope.return = res.data;
      })
    }

    googleReq($scope.fromLoc.replace(" ", "+"));
    googleReq($scope.toLoc.replace(" ", "+"));

    window.setTimeout(function() {
      if ($scope.coords.length > 1) {
        console.log("calling uber");
        uberReq();
        window.clearTimeout(this);
      } else
        console.log("hey");
    }, 500);

    /*function uberReq() {

    }
    $http({
      method: 'POST',
      url: authUrl,
      headers: {
        "content-type": "application/json",
        "authorization": $scope.authCred
      }, data: {
        "grant_type": "client_credentials",
        "scope": "public"
      }
    }).then(function s(res) {
      $scope.return = res.data;
      console.log(res.data);
    }, function e(res) {
      $scope.return = res.data;
      console.log(res.data);
    })*/
  }
}])
