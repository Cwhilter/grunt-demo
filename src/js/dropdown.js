/*跨浏览器事件(使用DOM2级事件)*/
'use strict';
var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeHandler){
			element.removeHandler(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
};
/*导航插件开关*/
/*采用selectors API,支持IE8+、Firefox3.5+、Safari3.1+、Chrome和Opera10+*/
EventUtil.addHandler(window,"load",function(event){
		(function(){
			function stopPropagation(){
				return function(event){
					EventUtil.stopPropagation(event);
				};
			}
			function changeStyle(){
				return function(){
					var ul=this.querySelector("ul");
					var span=this.querySelector("span");
					if(!ul.style.display||ul.style.display=="none"){			
						span.className="glyphicon glyphicon-chevron-up";
						ul.style.display="block";
						if(this.className=="dropdown-table"){
							this.className="dropdown-table open";
						}
						else{
							this.className="dropdown-table2 open";
						}
					}else{
						span.className="glyphicon glyphicon-chevron-down";
						ul.style.display="none";
						if(this.className=="dropdown-table open"){
							this.className="dropdown-table";
						}
						else{
							this.className="dropdown-table2";
						}
						
					}
					var li=this.querySelectorAll("li.dropdown-table2");
					console.log(li);
					for(var i=0;i<li.length;i++){
						EventUtil.addHandler(li[i],"click",stopPropagation());	
					}	
					li=this.querySelectorAll("li.dropdown-table3");
					console.log(li);
					for(i=0;i<li.length;i++){
						EventUtil.addHandler(li[i],"click",stopPropagation());	
					}		
				};
			}
			var list=document.querySelectorAll(".dropdown-table");
			for(var i=0;i<list.length;i++){
				EventUtil.addHandler(list[i],"click",changeStyle());
				EventUtil.addHandler(list[i],"click",stopPropagation());	
		    }
		    list=document.querySelectorAll(".dropdown-table2");
			for(i=0;i<list.length;i++){
				EventUtil.addHandler(list[i],"click",changeStyle());
				EventUtil.addHandler(list[i],"click",stopPropagation());	
		    }
		    //全部产品按钮
		    var btn_all=document.querySelector(".dropdown-header");
		    EventUtil.addHandler(btn_all,"click",function(){
		    	var div=this.querySelector(".dropdown-all");
		    	if(!div.style.display||div.style.display=="none"){
		    		this.className="dropdown-header action";
		    		div.style.display="block";
		    	}else{
		    		this.className="dropdown-header";
		    		div.style.display="none";
		    	}
		    	var li=this.querySelectorAll("li");
		    	for(var i=0;i<li.length;i++){
						EventUtil.addHandler(li[i],"click",stopPropagation());	
				
				}	
		    });
		})();
		(function(){
			var href=location.href;
			var div=document.querySelector(".dropdown");
			var listA=div.querySelectorAll("a");
			var a;
			for(var i=0;i<listA.length;i++)
			{
				if(listA[i].getAttribute("href")===href)
					{
						a=listA[i];
						break;
					}
			}
			if(a){
				a.style.color="#00a2ac";
				var par=a.parentNode;
				par.className+=" dropdown-table-active";
				for(var node=a.parentNode.parentNode;node.className!="dropdown";node=node.parentNode){
					if(node.nodeName==="UL"){
						node.style.display="block";
						console.log(node);
					}
					if(node.nodeName==="LI"){
						
						var span=node.querySelector("span");
						span.className="glyphicon glyphicon-chevron-up";
						if(node.className=="dropdown-table"){
							node.className="dropdown-table open";
						}
						else{
							node.className="dropdown-table2 open";
						}
					}
				}
			}	
		})();
});