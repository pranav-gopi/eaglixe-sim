(function(){
	
	var app = angular.module('profiler', []);
	
	app.controller('DetailsController', function(){
		this.details = userDetails;
	});
	
	var userDetails = [{
			name: "Pranav Gopi",
			mobile: "2020202002",
			email: "alsdk@asd.com",
			isAdmin: true,
			profilepic:"Simages/img1.jpg"
		},{
			name: "Ram",
			mobile: "232312002",
			email: "sdff@sdsad.com",
			isAdmin: false,
			profilepic:"images/img2.png"
		}
	];
})();


