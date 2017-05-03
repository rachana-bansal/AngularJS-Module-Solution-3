(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var menu = this;
  menu.found = [];

  menu.findMatchedItems = function (){
    var searchTerm = menu.searchTerm;
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);


    promise.then(function (response) {
        menu.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })

  }

  menu.onRemove = function(index){
    menu.found.splice(index,1);
  }
	
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {

  var service = this;


  service.getMatchedMenuItems = function (searchTerm) {


    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response){

      var menuList = response.data["menu_items"];

      var foundList = [];

      for (var i = 0; i < menuList.length ; i++)
      {

        var description = menuList[i]["description"];

        if (description.toLowerCase().indexOf(searchTerm) != -1) {
          foundList.push(menuList[i]);
        }

      }

      return foundList;

    })
    .catch(function (errorResponse) {

      return errorResponse;
    });


  };

}

})();
