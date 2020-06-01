(
    function () {
        'use strict';

        angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

        ToBuyController.$inject = ['ShoppingListCheckOffService'];
        function ToBuyController(ShoppingListCheckOffService) {
            var toBuyList = this;
            toBuyList.items = ShoppingListCheckOffService.getToBuyList();
            toBuyList.toBuyListMessage = ShoppingListCheckOffService.getToBuyListMessage();
            toBuyList.boughtListMessage = ShoppingListCheckOffService.getBoughtListMessage();

            toBuyList.name = "";
            toBuyList.quantity = "";

            toBuyList.buyItem = function (index) {
                ShoppingListCheckOffService.addItemToBoughtList(toBuyList.items[index].name, toBuyList.items[index].quantity);
                ShoppingListCheckOffService.removeItemFromToBuyList(index);
                toBuyList.toBuyListMessage = ShoppingListCheckOffService.getToBuyListMessage();
                toBuyList.boughtListMessage = ShoppingListCheckOffService.getBoughtListMessage();
            };
            
        };

        AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
        function AlreadyBoughtController(ShoppingListCheckOffService) {
            var boughtList = this;
            boughtList.items = ShoppingListCheckOffService.getBoughtList();
        };

        function ShoppingListCheckOffService() {
            var service = this;

            var toBuyList = [{ name: "Cookies", quantity: 10 },
            { name: "Milk", quantity: 2 },
            { name: "Pepsi", quantity: 8 },
            { name: "Chocolate", quantity: 5 },
            { name: "Butter", quantity: 3 },
            { name: "Maggi", quantity: 6 }];
            var boughtList = [];

            var toBuyListMessage = "";
            var boughtListMessage = "Nothing bought yet.";

            service.getToBuyList = function () {
                return toBuyList;
            };
            service.getBoughtList = function () {
                return boughtList;
            };

            service.getToBuyListMessage = function () {
                return toBuyListMessage;
            };
            service.getBoughtListMessage = function () {
                return boughtListMessage;
            };

            service.addItemToBoughtList = function (itemName , itemQuantity) {
                var item = {
                    name: itemName,
                    quantity: itemQuantity
                }
                boughtList.push(item);
                boughtListMessage = "";
            };
            service.removeItemFromToBuyList = function (index) {
                toBuyList.splice(index, 1);
                if(toBuyList==undefined || toBuyList.length == 0){
                    toBuyListMessage = "Everything is bought!";
                }
            };
            
        };


    }
)();