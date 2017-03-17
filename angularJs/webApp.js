var indexControllers = angular.module('indexControllers', ['ngResource']);
//创建Top
indexControllers.directive('top',["$timeout", function ($timeout) {
    return {
        restrict:'AE',
        templateUrl:'html/index/header.html',
        replace:true
    }
}]);
//创建Cover
indexControllers.directive('cover',["$timeout", function ($timeout) {
    return {
        restrict:'AE',
        templateUrl:'html/index/cover.html',
        replace:true
    }
}]);
//创建Modulars
indexControllers.directive('whole',["$timeout", function ($timeout) {
    return {
        restrict:'AE',
        templateUrl:'html/index/modulars.html',
        replace:true,
        link : function(){
        	$timeout(function(scope, element, attrs, ctrl) {
	            var len = $(".img_show").length;
	            for(var i = 0 ; i < len ; i ++){
	            	var length = $(".img_show").eq(i).children().length;
	            	if(length == 1){
						$(".img_show").eq(i).addClass("img1");
					}else if(length > 1 && length < 5){
						$(".img_show").eq(i).addClass("img4");
					}else if(length > 4){
						$(".img_show").eq(i).addClass("img7");
					}
	         	};
	         	var commentLen = $(".comment_text").length;
	            for(var i = 0 ; i < len ; i ++){
	            	var length = $(".comment_text").eq(i).children().length;
	            	if(length > 3){
						$(".comment_text").eq(i).children().eq(2).nextAll().hide();
						$(".more").eq(i).find("em").text((length-3) + "条")
					}
	         	};
	        },500);
        } 
    }
}]);
//创建Preview
indexControllers.directive('preview',["$timeout", function ($timeout) {
    return {
        restrict:'AE',
        templateUrl:'html/index/preview.html',
        replace:true
    }
}]);
//控制器PreviewCtrl
indexControllers.controller('previewCtrl',function($scope,$http){
	$scope.close = function(){
		$(".preview").hide();
	}
});
//控制器JournalCtrl
indexControllers.controller("journalCtrl",function($scope,$http){
	$http.get("data/journal.json").success(function(res){
		$scope.journals = res.journal;
		$scope.pics = res.picture;
		var fabulousLen = $scope.journals.length;
		$scope.fabulous = function(id){
			angular.forEach($scope.journals,function(data,index,array){
				if(id == data.id) {
					$(".fabulous").eq(index).children("i").toggleClass("curr");
					var text = $(".fabulous").eq(index).children("em").text();
					if($(".fabulous").eq(index).children("i").hasClass("curr")){
						text++;
					}else{
						text--;
					}
					$(".fabulous").eq(index).children("em").text(text);
				};
			});	
			angular.forEach($scope.pics,function(data,index,array){
				if(id == data.id) {
					$(".fabulous").eq(index+fabulousLen).children("i").toggleClass("curr");
					var text = $(".fabulous").eq(index+fabulousLen).children("em").text();
					if($(".fabulous").eq(index+fabulousLen).children("i").hasClass("curr")){
						text++;
					}else{
						text--;
					}
					$(".fabulous").eq(index+fabulousLen).children("em").text(text);
				};
			});
		};
		//收起less
		$scope.less = function(id){
			angular.forEach($scope.journals,function(data,index,array){
				if(id == data.id) {
					$(".comment_text").eq(index).children().eq(2).nextAll().hide();
					$(".less").eq(index).hide();
					$(".more").eq(index).show();
				};
			});	
			angular.forEach($scope.pics,function(data,index,array){
				if(id == data.id) {
					$(".comment_text").eq(index+fabulousLen).children().eq(2).nextAll().hide();
					$(".less").eq(index+fabulousLen).hide();
					$(".more").eq(index+fabulousLen).show();
				};
			});	
		};
		//查看更多more
		$scope.more = function(id){
			angular.forEach($scope.journals,function(data,index,array){
				if(id == data.id) {
					$(".comment_text").eq(index).children().show();
					$(".more").eq(index).hide();
					$(".less").eq(index).show();
				}
			});	
			angular.forEach($scope.pics,function(data,index,array){
				if(id == data.id) {
					$(".comment_text").eq(index+fabulousLen).children().show();
					$(".more").eq(index+fabulousLen).hide();
					$(".less").eq(index+fabulousLen).show();
				}
			});	
		};
		//预览former
		$scope.former = function(id){
			angular.forEach($scope.pics,function(data,index,array){
				angular.forEach(data.imgs,function(data1,index1,array1){
					if(id == data1.id) {
						$(".preview").show().find("img").attr("src",data1.imgUrl);
					}
				});
			});
		};
		//删除del
		$scope.del = function (id){
			angular.forEach($scope.journals,function(data,index,array){
				if(id == data.id) {
					show($(".modular").eq(index),array,index);
				}
			});
			angular.forEach($scope.pics,function(data,index,array){
				if(id == data.id) {
					show($(".modular").eq(index+fabulousLen),array,index);
				}
			});
		};
		//删除comment
		$scope.comment = function(id){
			angular.forEach($scope.journals,function(data,index,array){
				if(id == data.id) {
					if($(".comment").eq(index).parent().next().hasClass("box")){
						$(".comment").eq(index).parent().next().remove();
					}else{
						$(".box").remove();
						var box = '<p class="box"><input type="text" id="input" /><b id="btn">提交</b></p>'
						$(".comment").eq(index).parent().after(box);
					}
				}
			});
		};
	});
});



