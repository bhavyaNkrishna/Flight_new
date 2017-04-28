'use strict';

angular.module('myApp').factory('BookService', ['$http', '$q', function($http, $q){
	
	var factory = {
	        fetchAllBooks: fetchAllBooks,
	        createBook: createBook,
	        updateBook:updateBook,
	        deleteBook:deleteBook,
	        fetchBookTransaction:fetchBookTransaction,
	        createTransaction:createTransaction,
	        updateTransaction:updateTransaction
	    };

	    return factory;
	    
	    function fetchAllBooks() {
	        var deferred = $q.defer();
	        $http.get('/books/list')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Books');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
}]);