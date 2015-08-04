"use strict";angular.module("parkattackgithubioApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/register/:email",{templateUrl:"views/register.html",controller:"RegisterCtrl",controllerAs:"register"}).otherwise({redirectTo:"/"})}]),angular.module("parkattackgithubioApp").controller("MainCtrl",["$scope","$location","Auth","User",function(a,b,c,d){"localhost"==b.host()&&(a.debug=!0),a.user={},a.logout=function(){c.$unauth(),a.user={}},a.go=function(){c.$authWithPassword({email:a.user.email,password:a.user.password}).then(function(b){b&&b.uid&&(a.user=d.get(b.uid))})["catch"](function(b){a.error=b,a.register()})},a.register=function(){b.path("/register/"+a.user.email)},a.auth=c,a.auth.$onAuth(function(b){a.authData=b,b&&b.uid&&(a.user=d.get(b.uid))})}]),angular.module("parkattackgithubioApp").constant("FIREBASE_URL","https://parkattack.firebaseio.com/"),angular.module("parkattackgithubioApp").factory("Ref",["FIREBASE_URL",function(a){return new Firebase(a)}]),angular.module("parkattackgithubioApp").factory("Auth",["$firebaseAuth","$rootScope","Ref",function(a,b,c){return a(c)}]),angular.module("parkattackgithubioApp").factory("Users",["$firebaseArray","Ref",function(a,b){return a(b.child("Users"))}]),angular.module("parkattackgithubioApp").factory("User",["$firebaseObject","Ref",function(a,b){return{get:function(c){return a(b.child("Users").child(c))},add:function(c,d){return b.child("Users").child(c).set(d),a(b.child("Users").child(c))}}}]),angular.module("parkattackgithubioApp").controller("RegisterCtrl",["$scope","$location","$routeParams","Auth","User","ProperNounFormatter",function(a,b,c,d,e,f){if("localhost"==b.host()&&(a.debug=!0),c.email){a.user={email:c.email};var g=a.user.email.replace(/[^@]+@([^.]*).*/,"$1");["yahoo","gmail","hotmail"].indexOf(g.toLowerCase())<0&&(a.user.company=f.spacify(g,!0));var h=a.user.email.replace(/([^@]*)@.*/,"$1");a.user.name=f.spacify(h)}a.go=function(){d.$createUser({email:a.user.email,password:a.user.password}).then(function(c){d.$authWithPassword({email:a.user.email,password:a.user.password}).then(function(c){e.add(c.uid,{email:a.user.email,name:a.user.name,company:a.user.company,avatar:c.password.profileImageURL}),b.path("/")})["catch"](function(b){a.error=b})})["catch"](function(b){a.error=b})}}]),angular.module("parkattackgithubioApp").service("ProperNounFormatter",function(){return{spacify:function(a,b){return a.indexOf(".")>0||a.indexOf("_")>0||a.indexOf("-")>0?a=a.split(/[\._\-]/).map(function(a){return a.charAt(0).toUpperCase()+a.slice(1)}).join(" "):/[A-Z]/.test(a)&&(a=b?a.replace(/([a-z])([A-Z])/g,"$1 $2"):a.replace(/^[a-z]|[A-Z]/g,function(a,b){return 0===b?a:" "+a})),a}}}),angular.module("parkattackgithubioApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/login.html",'<form> <div class="form-group col-md-4"> <input type="email" class="form-control" placeholder="email" required autofocus> </div> <div class="form-group col-md-4"> <input type="password" class="form-control" placeholder="password" required> </div> <div class="form-group col-md-4"> <input type="submit" class="btn btn-primary" value="sign up / login"> </div> </form>'),a.put("views/main.html",'<div class="jumbotron"> <p class="lead"> <img src="images/parkattack500x425.97a911c9.png" alt="let\'s play"> </p> </div> <div class="row marketing"> <h3>coming soon:</h3> <ul> <li>Friday, September 4th 2015 in Phase 2 LaunchPad aka "the den"...</li> </ul> </div> <div class="row marketing"> <h4>join in...</h4> <p> <a href="https://plymouthsciencepark.slack.com/messages/parkattack/">...the conversation</a> </p> </div> <div class="row" ng-show="user.$id"> <h4> <img ng-src="{{user.avatar}}" ng-show="user.avatar" class="img-rounded" style="width:30px; height: 30px"> Hi {{user.name}}! </h4> <p><a href ng-click="logout()">logout</a></p> </div> <div class="row" ng-show="!user.$id"> <form ng-submit="go()"> <div class="form-group col-md-5"> <input type="email" class="form-control" placeholder="email" ng-model="user.email" required autofocus> </div> <div class="form-group col-md-5"> <input type="password" class="form-control" placeholder="password" ng-model="user.password" required autofocus> </div> <div class="form-group col-md-2"> <input type="submit" class="form-control btn btn-primary" value="login"> </div> <div class="form-group col-md-2 pull-right"> <input type="button" class="form-control btn btn-default" value="sign up" ng-click="register()"> </div> </form> </div> <div class="row" ng-show="debug"> <pre>{{authData | json}}</pre> <pre>{{user | json}}</pre> <pre>{{error | json}}</pre> </div>'),a.put("views/register.html",'<div class="row marketing"> <h3>sign up for park attack</h3> <p>We\'ll notify you by email of upcoming Park Attack events.</p> </div> <div class="row"> <form ng-submit="go()" class="clearfix"> <div class="form-group col-md-6"> <label for="name">name:</label> <input type="text" class="form-control" placeholder="your name" ng-model="user.name" required autofocus> </div> <div class="form-group col-md-6"> <label for="company">company:</label> <input type="text" class="form-control" placeholder="company" ng-model="user.company"> </div> <div class="form-group col-md-6"> <label for="email">email:</label> <input type="email" class="form-control" placeholder="your email" ng-model="user.email" required> </div> <div class="form-group col-md-6"> <label for="password">password:</label> <input type="password" class="form-control" placeholder="your password" ng-model="user.password" required> </div> <div class="form-group col-md-6 pull-right"> <input type="submit" class="form-control btn btn-primary" value="log in"> </div> </form> <p> tip: if you sign up with your work email address, you\'ll see other people and Park Attack teams from your company. </p> </div> <div class="row" ng-show="debug"> <pre>{{authData | json}}</pre> <pre>{{user | json}}</pre> <pre>{{error | json}}</pre> </div>')}]);