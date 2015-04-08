var app = angular.module('PuppyStore', ['ui.router']);


app.controller('HomeController', function ($scope) {
    $scope.message = 'Hello, welcome to the puppy store!';
});

app.controller('PuppyController', function ($scope, $stateParams, puppy) {
    $scope.puppy = $stateParams.puppyName;
    $scope.puppyData = puppy;
});

app.controller('PuppyInfoController', function ($scope, puppy) {
    $scope.puppy = puppy;
});

app.controller('PuppyGalleryController', function ($scope, puppy) {
    $scope.puppy = puppy;
});

app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/home',
        template: '<h1>{{ message }}</h1>',
        controller: 'HomeController'
    });

    $stateProvider.state('list', {
        url: '/listing',
        templateUrl: 'templates/list.html',
        controller: function ($scope, $state) {
            $scope.puppies = [
                'Golden Retriever',
                'Pug',
                'Corgi',
                'King Charles Spaniel'
            ];

            $scope.switchToPuppyPage = function (puppy) {
                $state.go('list.puppy.info', {puppyName: puppy});
            };

        }
    });

    $stateProvider.state('list.puppy', {
        url: '/puppy/:puppyName',
        templateUrl: 'templates/puppy.html',
        controller: 'PuppyController',
        resolve: {
            puppy: function ($stateParams, Puppies) {
                return Puppies[$stateParams.puppyName];
            }
        }
    });

    $stateProvider.state('list.puppy.info', {
        url: '/info',
        templateUrl: 'templates/puppy-info.html',
        controller: 'PuppyInfoController'
    });

    $stateProvider.state('list.puppy.gallery', {
        url: '/gallery',
        templateUrl: 'templates/puppy-gallery.html',
        controller: 'PuppyGalleryController'
    });

});

app.factory('Puppies', function () {

    return {
        'Golden Retriever': {
            info: 'Joes favorite kind of dog.',
            image: 'http://3.bp.blogspot.com/-iVeRPzb14xk/UeCIIlGIp6I/AAAAAAAACQY/o5BxoQ0AWEs/s1600/1013714_630706690284534_93067337_n.jpg'
        },
        'Corgi': {
            info: 'Really good at herding',
            image: 'http://hqtiger.mobi/wp-content/uploads/welsh-corgi-puppies-wallpaper-2.jpg'
        },
        'King Charles Spaniel': {
            info: 'Great for apartments',
            image: 'http://images.fineartamerica.com/images-medium-large/portrait-of-a-king-charles-spaniel-puppy-marcy-maloy.jpg'
        },
        'Pug': {
            info: 'Has breathing problems',
            image: 'http://www.puppiespuppy.com/wp-content/uploads/2014/09/Pug-Puppy-For-Sale.jpg'
        }
    };

});
