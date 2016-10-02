!function(){"use strict";angular.module("lawsApp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","mgcrea.ngStrap","infinite-scroll"])}(),function(){"use strict";angular.module("lawsApp").config(["$stateProvider",function(i){i.state("politician",{url:"/politicos",templateUrl:"app/politician/list/politician.html",controller:"PoliticianCtrl"})}])}(),function(){"use strict";angular.module("lawsApp").controller("PoliticianCtrl",["$scope","$http",function(i,l){l.get("http://temis-server.herokuapp.com/api/alderman").success(function(l){i.politicians=l,i.politicianOrder="name"}).error(function(i){console.log(i)})}])}(),function(){"use strict";angular.module("lawsApp").config(["$stateProvider",function(i){i.state("politicanDetails",{url:"/politicos/:itemId",templateUrl:"app/politician/details/politicanDetails.html",controller:"PoliticanDetailsCtrl"})}])}(),function(){"use strict";angular.module("lawsApp").controller("PoliticanDetailsCtrl",["$scope","$http","$stateParams",function(i,l,a){l.get("data/vereadores.json").success(function(l){i.politicians=l,i.whichItem=a.itemId,i.prevItem=a.itemId>0?Number(a.itemId)-1:i.politicians.length-1,i.nextItem=a.itemId<i.politicians.length-1?Number(a.itemId)+1:0})}])}(),function(){"use strict";function i(){function i(){}var l={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:i,controllerAs:"vm",bindToController:!0};return l}angular.module("lawsApp").directive("acmeNavbar",i)}(),function(){"use strict";angular.module("lawsApp").config(["$stateProvider",function(i){i.state("laws",{url:"/leis",templateUrl:"app/laws/list/laws.html",controller:"LawsCtrl"}).state("laws-alderman",{url:"/leis/alderman/:name",templateUrl:"app/laws/list/laws.html",controller:"LawsCtrl"})}])}(),function(){"use strict";angular.module("lawsApp").controller("LawsCtrl",["$scope","$http","$stateParams",function(i,l,a){a.name?l.get("http://temis-server.herokuapp.com/api/laws/alderman/"+a.name).success(function(l){i.laws=l._embedded.lawList,i.lawOrder="code"}).error(function(i){console.log(i)}):l.get("http://temis-server.herokuapp.com/api/laws").success(function(l){i.laws=l._embedded.lawList,i.lawOrder="code"}).error(function(i){console.log(i)}),i.myPagingFunction=function(){console.log("adadadasdasdas")}}])}(),function(){"use strict";angular.module("lawsApp").config(["$stateProvider",function(i){i.state("lawDetails",{url:"/leis/:code",templateUrl:"app/laws/details/lawDetails.html",controller:"LawDetailsCtrl"})}])}(),function(){"use strict";angular.module("lawsApp").controller("LawDetailsCtrl",["$scope","$http","$stateParams",function(i,l,a){a.code,l.get("http://temis-server.herokuapp.com/api/laws/"+a.code).success(function(l){i.law=l}).error(function(i){console.log(i)})}]).filter("markdown",["$sce",function(i){var l=new Showdown.converter;return function(a){var s=l.makeHtml(a||"");return i.trustAsHtml(s)}}])}(),function(){"use strict";function i(){}angular.module("lawsApp").controller("MainController",i)}(),function(){"use strict";function i(i){i.debug("runBlock end")}i.$inject=["$log"],angular.module("lawsApp").run(i)}(),function(){"use strict";function i(i,l){i.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),l.otherwise("/")}i.$inject=["$stateProvider","$urlRouterProvider"],angular.module("lawsApp").config(i)}(),function(){"use strict";angular.module("lawsApp").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function i(i,l){i.debugEnabled(!0),l.options.timeOut=3e3,l.options.positionClass="toast-top-right",l.options.preventDuplicates=!0,l.options.progressBar=!0}i.$inject=["$logProvider","toastr"],angular.module("lawsApp").config(i)}(),angular.module("lawsApp").run(["$templateCache",function(i){i.put("app/main/main.html",'<div class="container"><div><acme-navbar></acme-navbar></div><div class="jumbotron text-center"><h1>Monitor Legislativo</h1><p class="lead"><br>Acesse todas as leis municipais de São José dos Campos de forma descomplicada.</p></div></div>'),i.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" bs-navbar=""><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#/"><span class="glyphicon glyphicon-home"></span> Monitor Legislativo</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li data-match-route="/$"><a ng-href="#/">Inicial</a></li><li data-match-route="/leis"><a href="#/leis">Leis</a></li><li data-match-route="/politicos"><a href="#/politicos">Políticos</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"></ul></div></div></nav>'),i.put("app/laws/details/lawDetails.html",'<header ng-include="\'app/components/navbar/navbar.html\'"></header><div class="container" ng-model="laws"><div><h3>{{ law.title }}</h3><h3>Projeto de lei nº {{ law.projectLawNumber }}</h3><h3>{{ law.date }}</h3><div id="lawCompleteBody" ng-bind-html="law.desc | markdown"></div></div></div>'),i.put("app/laws/list/laws.html",'<div class="col-md-12"><div class="container"><header ng-include="\'app/components/navbar/navbar.html\'"></header><div><h2>Listagem de leis</h2></div><div class="well"><div class="input-group input-group-lg"><span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-search"></i></span> <input ng-model="query" placeholder="Pesquise por leis" autofocus="" type="text" class="form-control" aria-describedby="sizing-addon1"></div></div><div class="row"><div class="col-6 col-sm-6 col-lg-4" ng-repeat="item in laws | filter: query | orderBy: lawOrder:direction"><a class="thumbnail" href="#/leis/{{::item.code}}"><div class="caption"><h3 style="text-transform:capitalize;">{{ ::item.code }}</h3><p>{{ ::item.title }}</p><p ng-repeat="alderman in item.author"><strong>{{ ::alderman.name }}</strong></p><p><strong>{{ ::item.date }}</strong></p></div></a></div></div></div></div>'),i.put("app/politician/details/politicanDetails.html",'<header ng-include="\'app/components/navbar/navbar.html\'"></header><div class="container backgroundBlue" ng-model="politicians"><center><a href="#/politicos/{{prevItem}}"><span class="glyphicon glyphicon-chevron-left"></span> Anterior</a> <a href="#/politicos/{{nextItem}}">Próximo <span class="glyphicon glyphicon-chevron-right"></span></a></center><div class="row profile"><div class="col-md-3"><div class="profile-sidebar"><div class="profile-userpic"><img ng-src="{{politicians[whichItem].FOTO}}" alt="Photo of {{politicians[whichItem].name}}" class="img-responsive"></div><div class="profile-usertitle"><div class="profile-usertitle-name">{{politicians[whichItem].NOME_URNA_CANDIDATO}}</div><div class="profile-usertitle-job">{{politicians[whichItem].DESCRICAO_GRAU_INSTRUCAO}}</div><div class="profile-usertitle-job">{{politicians[whichItem].NOME_PARTIDO}}</div></div><div class="profile-userbuttons"><button type="button" class="btn btn-success">Seguir</button> <button type="button" class="btn btn-danger btn-sm">Mensagem</button></div><div class="profile-usermenu"><ul class="nav"><li class="active"><a href="#"><i class="glyphicon glyphicon-home"></i> Overview</a></li><li><a href="#"><i class="glyphicon glyphicon-user"></i> Account Settings</a></li><li><a href="#" target="_blank"><i class="glyphicon glyphicon-ok"></i> Tasks</a></li><li><a href="#"><i class="glyphicon glyphicon-flag"></i> Help</a></li></ul></div></div></div><div class="col-md-9"><div class="profile-content"><div class="page-header"><h1 id="">Linha do tempo dos projetos</h1></div><div id="timeline"><div class="row timeline-movement timeline-movement-top"><div class="timeline-badge timeline-future-movement"><a href="#"><span class="glyphicon glyphicon-plus"></span></a></div><div class="timeline-badge timeline-filter-movement"><a href="#"><span class="glyphicon glyphicon-time"></span></a></div></div><div class="row timeline-movement"><div class="timeline-badge"><span class="timeline-balloon-date-day">18</span> <span class="timeline-balloon-date-month">APR</span></div><div class="col-sm-6 timeline-item"><div class="row"><div class="col-sm-11"><div class="timeline-panel credits"><ul class="timeline-panel-ul"><li><span class="importo">Mussum ipsum cacilds</span></li><li><span class="causale">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p></li></ul></div></div></div></div><div class="col-sm-6 timeline-item"><div class="row"><div class="col-sm-offset-1 col-sm-11"><div class="timeline-panel debits"><ul class="timeline-panel-ul"><li><span class="importo">Mussum ipsum cacilds</span></li><li><span class="causale">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p></li></ul></div></div></div></div></div><div class="row timeline-movement"><div class="timeline-badge"><span class="timeline-balloon-date-day">13</span> <span class="timeline-balloon-date-month">APR</span></div><div class="col-sm-offset-6 col-sm-6 timeline-item"><div class="row"><div class="col-sm-offset-1 col-sm-11"><div class="timeline-panel debits"><ul class="timeline-panel-ul"><li><span class="importo">Mussum ipsum cacilds</span></li><li><span class="causale">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p></li></ul></div></div></div></div><div class="col-sm-6 timeline-item"><div class="row"><div class="col-sm-11"><div class="timeline-panel credits"><ul class="timeline-panel-ul"><li><span class="importo">Mussum ipsum cacilds</span></li><li><span class="causale">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p></li></ul></div></div></div></div></div><div class="row timeline-movement"><div class="timeline-badge"><span class="timeline-balloon-date-day">10</span> <span class="timeline-balloon-date-month">APR</span></div><div class="col-sm-offset-6 col-sm-6 timeline-item"><div class="row"><div class="col-sm-offset-1 col-sm-11"><div class="timeline-panel debits"><ul class="timeline-panel-ul"><li><span class="importo">Mussum ipsum cacilds</span></li><li><span class="causale">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p></li></ul></div></div></div></div><div class="col-sm-6 timeline-item"><div class="row"><div class="col-sm-11"><div class="timeline-panel credits"><ul class="timeline-panel-ul"><li><span class="importo">Mussum ipsum cacilds</span></li><li><span class="causale">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p></li></ul></div></div></div></div></div></div></div></div></div></div><center><a href="#/politicos">&laquo; Voltar</a></center><br><br>'),i.put("app/politician/list/politician.html",'<div class="col-md-12"><div class="container"><header ng-include="\'app/components/navbar/navbar.html\'"></header><div><h2>Vereadores de São José dos Campos</h2></div><div class="slide-animate" ng-include="" src="\'views/base/facebook.html\'"></div><div class="well"><div class="input-group input-group-lg"><span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-search"></i></span> <input ng-model="query" placeholder="Procure pelos vereadores" autofocus="" type="text" class="form-control" aria-describedby="sizing-addon1"></div></div><div class="row"><div class="col-xs-6 col-sm-4" ng-repeat="item in politicians | filter: query | orderBy: politicianOrder:direction"><div class="card hovercard"><div class="cardheader"></div><div class="avatar"><img alt="Photo of {{ ::item.name }}" ng-src="{{ ::item.photo }}" ng-if="!item.notFound"> <img alt="Photo of {{ ::item.name }}" ng-src="http://sjcdigital.github.io/balanco-municipios-sp/images/dados_abertos_sjc.jpg" ng-if="item.notFound"></div><div class="info"><div class="title"><a href="#/leis/alderman/{{::item.name}}">{{ ::item.name }}</a></div><div class="desc">{{ ::item.politicalParty }}<br>{{ ::item.email }}</div></div></div></div></div></div></div>')}]);