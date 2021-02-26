(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


// ******************************** //
// Controller for "BUY LIST"
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var contrlBuy = this;

  // List information (Count und Message)
  contrlBuy.messageText = "Everything is bought!";
  contrlBuy.messageVisible = function () {
    return ShoppingListCheckOffService.getCountBuy() == 0;
  }

  // Operation "Buy of Item" (Realisation from Service)
  contrlBuy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

  // Get list of items (from Service)
  contrlBuy.items = ShoppingListCheckOffService.getItemsBuy();
}



// ******************************** //
// Controller for "BOUGHT LIST"
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var contrlBought = this;

  // List information (Count und Message)
  contrlBought.messageText = "Nothing bought yet";
  contrlBought.messageVisible = function () {
    return ShoppingListCheckOffService.getCountBought() == 0;
  }

  // Get list of items (from Service)
  contrlBought.items = ShoppingListCheckOffService.getItemsBought();
}


// ******************************** //
// SERVICE FUNCTION
function ShoppingListCheckOffService() {
  var service = this;

  // Default initialization of Array for BAY LIST
  var itemsBuy = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Tomatos",
      quantity: "10"
    },
    {
      name: "Chips",
      quantity: "15"
    },
    {
      name: "Solt",
      quantity: "125"
    }
  ];

  // Empty array for BOUGHT LIST
  var itemsBought = [];

  // Replace item from "BUY" to "BOUGHT"
  service.buyItem = function (itemBuyIndex) {

    // Initialisation item for Replace
    var itemReplece = {
      name: itemsBuy[itemBuyIndex].name,
      quantity: itemsBuy[itemBuyIndex].quantity
    };

    // Add item in Array "BOUGHT"
    itemsBought.push(itemReplece);

    // Delete item from array "BUY"
    itemsBuy.splice(itemBuyIndex, 1);
  }

  // Get actual list "Buy"
  service.getItemsBuy = function () {
    return itemsBuy;
  };

  // Get actual list "Bought"
  service.getItemsBought = function () {
    return itemsBought;
  };

  // Get count of element in array "Buy"
  service.getCountBuy = function () {
    return itemsBuy.length;
  };

  // Get count of element in array "Bought"
  service.getCountBought = function () {
    return itemsBought.length;
  };
}

})();
