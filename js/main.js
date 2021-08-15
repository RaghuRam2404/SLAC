var totalWidth = 0;
var totalHeight = 0;
var startBarHeight = 40;
var logged = false;
var startBarApps = [];
var openedApps = [];
var minbool = false;
var startMenuIsTrue = false;
var isDesktop = false;

document.oncontextmenu=RightMouseDown;
document.onmousedown = doSomething;
function RightMouseDown(e){
	return false; 
}

function doSomething(e) {
	var rightclick;
	if (!e) var e = window.event;
	if (e.which) rightclick = (e.which == 3);
	else if (e.button) rightclick = (e.button == 2);
	
	if(rightclick==true) doCss(e);
	//else Check(e);
}

function doCss(e){
	//e.srcElement.innerHTML
	return false;
}

// remove function for array
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


$(document).ready(function() {
	$('#form1').submit(submitForm);
});

/****************  Login Section  **************************/

function submitForm(){
	var stat;
 	stat = check();
	if(stat == false){
		/*$('.error').hide().show('drop', {
			  duration: 200,
			  direction : "right",
			  easing: 'easeOutBounce', 
			});*/
		$('.error').html("The username or password is incorrect.");
	}else{
		checkLogin();
			setContents();
			drawWindows();
	}
	return false;	
}

function checkLogin(){
	$('#login').css({"height":totalHeight});
	$('#windows').css({"height":totalHeight});
	$('#start').hide();
	if(sessionStorage.name && sessionStorage.name != "" ){
		$('#login').hide();	
		// show loading
		$('#windows').hide();
			$('#windows').hide().show('drop', {
			  duration: 200,
			  direction : "right",
			  easing: 'linear', 
			});
		logged = true;
	}else{
		$('#windows').hide();
		$('#login').css({"display":"block"});
		logged = false;
	}
}

// end of login section

/************* For Start Bar Customisation ***************/

function dates(){

	$('#dateAndTime').datepicker();
	$('.ui-datepicker-inline').css({"position":"absolute","display":"block","top":"-"+(-35+$('#dateAndTime').height()+$('.ui-datepicker-inline').height())+"px","left":"-"+($('.ui-datepicker-inline').width()-($('#dateAndTime').width()+12))+"px"});	
}

function setContents(){	
	// if not logged, hide the contents
	if(logged == false) return;
	
	var contents = ""
					+"<canvas id='backgroundCanvas' width='"+totalWidth+"' height='"+totalHeight+"' > </canvas>"
					+"<div id='startbar' style='left:0px; top:"+(totalHeight - startBarHeight)+"; position:absolute;' >";
						// here add the installed applications
	// start button
	contents += "<div id='startbtn' onClick='startMenu();' ></div>";					
	// sort apps only if they are present in startbar
	startBarApps = [];
	for(var i=0; i<apps.length; i++){
		if(apps[i].isStartBarIcon())
			startBarApps[startBarApps.length] = apps[i];	
	}
	
	startBarApps.sort(function(a,b){
							if(a.startBarPosition > b.startBarPosition) return true;
							return false;
						});
	contents 	+= "<div id='sortStartBar'>";
	// start bar icons to draw
	for(var i=0; i<startBarApps.length; i++){
			contents += "<div class='startBarApp' onClick='openApp(\""+startBarApps[i].name+"\");' name='"+startBarApps[i].name+"'>"+
							"<img src='"+startBarApps[i].icon+"' alt='a'"+
							" width='"+startBarApps[i].width+"px' height='"+startBarApps[i].height+"px' "
						+" /></div>";
	}
	contents 	+=	"</div>";
	contents 	+= "<div id='showDesktop' title='Show Desktop' ></div><div  id='dateAndTime' title='Date and Time' >"+
									"<div id='time'></div><div id='date'></div>"+"</div>";
	contents 	+=	"</div>";
	// start bar icons are drawn
	
	window.setInterval(function(){
		  var d = new Date();
	      var hours = d.getHours();
		  var minutes = d.getMinutes();
		  var ampm = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  $('#date').html(d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear());
		  $('#time').html(strTime);
	}, 100);
	
	// for sorting the start bar icons
	$(function() {
		$( "#sortStartBar" ).sortable({
			containment: '#sortStartBar',		
			revert: true,
			stop: function(e,u){ updateStartBarIcon(e,u); }
		});
   });
	
	contents    += "<div id='desktop' style=' width:"+totalWidth+"px; height:"+(totalHeight-startBarHeight)+" ' >";
	// applications
	contents	+= "</div><div id='startMenu'></div>";
	contents  	+= "<div id='startBarAppClose' style='display: none;' ><button >CLOSE</button></div>";
	// applications ar edrawn
	
	$('#mainContents').html(contents);
	$('.startBarApp').mousedown(function(e){
		var rightclick;
		if (!e) var e = window.event;
		if (e.which) rightclick = (e.which == 3);
		else if (e.button) rightclick = (e.button == 2);
		if(rightclick==true) {
			var name = ($(this).attr("name"));	
			var top = $(this).offset().top, left=$(this).offset().left, width=$(this).width(), height=$(this).height();
			var btnWdt = $("#startBarAppClose").outerWidth(true);
			var btnHt = $("#startBarAppClose").outerHeight(true);
			for(var i=0; i< openedApps.length; i++)
				if(openedApps[i].name === name)
					break;
			if(i!=openedApps.length){
				var closeOption = "<button onclick='closeApp(\""+name+"\");' >CLOSE</button>";
				//alert(width+" "+height+" "+btnWdt+" "+btnHt+" "+top+" " +left);
				$('#startBarAppClose').css({"top":top-30,"left":left-(btnWdt/4)});
				$('#startBarAppClose').fadeIn("fast");
				$('#startBarAppClose').html(closeOption);
				window.setTimeout(function(){$('#startBarAppClose').fadeOut();}, 5000);
			}
			
			return false;
		}	
	});
	$('#desktop').append("<div id='bounceWrapper'><div id='bouncyText'><div>W</div>"+
    	"<div>I</div>"+
    	"<div>N</div>"+
    	"<div>D</div>"+
    	"<div>O</div>"+
    	"<div>W</div>"+
    	"<div>S</div>"+
		"</div><span>SHOPPING</span></div>");
	// show desktop || hide desktop
	$('#showDesktop').hover(function(){
			for(var i=0; i<openedApps.length; i++){
				$('.'+openedApps[i].name).fadeOut();
			}
		},function(){
			if(!isDesktop)
				for(var i=0; i<openedApps.length; i++){
					$('.'+openedApps[i].name).fadeIn();
				}
		}).click(function(){
			if(isDesktop){
				isDesktop = false;
				// in the order or opened apps, open them
				for(var i=0; i<openedApps.length; i++){
					openApp(openedApps[i].name);
				}
			}else{
				// minimize everything
				isDesktop = true;	
				for(var i=0; i<openedApps.length; i++){
					if(openedApps[i].minimized === false)
						minim(openedApps[i].name);
				}
			}
		});
	/***
	$('#dateAndTime').datepicker();
	$('.ui-datepicker-inline').css({"position":"absolute","display":"block","top":"-"+(-35+$('#dateAndTime').height()+$('.ui-datepicker-inline').height())+"px","left":"-"+($('.ui-datepicker-inline').width()-($('#dateAndTime').width()+12))+"px"});	*/
	
	var clickDate = true;
	$('#dateAndTime').click(function(){
		if(clickDate){
			$('#dateAndTime').datepicker();
			$('.ui-datepicker-inline').css({"position":"absolute","display":"block","top":"-"+(-35+$('#dateAndTime').height()+$('.ui-datepicker-inline').height())+"px","left":"-"+($('.ui-datepicker-inline').width()-($('#dateAndTime').width()+12))+"px"});	
			clickDate = false;	
		}else{
			$('#dateAndTime').datepicker();
			$('.ui-datepicker-inline').css({"position":"absolute","display":"none","top":"-"+(-35+$('#dateAndTime').height()+$('.ui-datepicker-inline').height())+"px","left":"-"+($('.ui-datepicker-inline').width()-($('#dateAndTime').width()+12))+"px"});	
			clickDate = true;	
		}
	});
}

function updateStartBarIcon(e,u){
	startBarApps = [];
	var j=0;
	$('#sortStartBar .startBarApp').each(function(){
		for(var i=0; i<apps.length; i++)
			if(apps[i].name === $(this).attr("name")){
				startBarApps[startBarApps.length] = apps[i];
				apps[i].startBarPosition = j;	
			}
		j++;
	});	
}

var sm = false;

function startMenu(){
	startMenuIsTrue = true;
	if(!sm){
		var top = $('#startbtn').offset().top;
		var left = 0;
		var startMenuContent = "";
		startMenuContent += "<div id='left'>";
		for(var i=0; i<apps.length; i++){
			if(apps[i].startMenuIcon === true){
				startMenuContent 	+= "<div class='menuApp' name='"+apps[i].name+"' onclick='openApp(\""+apps[i].name+"\")' >"
										+"<div id='text'><img src='"+apps[i].icon+"' width='20' height='20' />"+apps[i].name+"</div>"
									+"</div>";
			}
		}
		startMenuContent += "</div>";
		startMenuContent += "<div id='right'><div id='image'> <img src='images/15.png' width='90px' height='90px'/> </div>";
			startMenuContent += "<div id='rtCont' onclick='openApp(\"HtmlExplorer\")' style='cursor:pointer;'  >";
				startMenuContent += "My Computer";
			startMenuContent += "</div>";
			startMenuContent += "<div id='rtCont'>";
				startMenuContent += "Control Panel";
			startMenuContent += "</div>";
			/*startMenuContent += "<div id='rtCont'>";
				startMenuContent += "Uninstall";
			startMenuContent += "</div>";*/
			startMenuContent += "<div style='height:305px;' ></div>";
			startMenuContent += "<div id='rtCont' onclick='closeWindow();' >";
				startMenuContent += "Close";
			startMenuContent += "</div>";
			startMenuContent += "<div style='height:15px;' ></div>";
		startMenuContent += "</div>";
		$('#windows #startMenu').html(startMenuContent);
		$("#startMenu").css({"top":($('#desktop').height()-$('#startMenu').height())}).css({"left":"0"});
		$("#startMenu #left").css({"height":($('#startMenu').height()-18)});
		$("#startMenu").css({"z-index":openedApps.length+5});
		sm = true;
	}else{
		sm = false;	
		$("#startMenu").css({"z-index":0});
	}
}

function closeWindow(){
		window.open('', '_self', ''); window.close();
}

function trim(name){
	if(name.length > 27){
		return name.splice(0,26)+"...";
	}
	return name;
}

// end of start bar

/************ For the applications *******************/

function openApp(name){
	// find which app
	for(var i=0; i<apps.length; i++){
			if(apps[i].name === name){
				break;
			}
	}
	
	// open app at index 'i'
	var appContent = 	"<div id=\"app\" class='"+apps[i].name+"' width='"+apps[i].appWidth+"px' height='"+apps[i].appHeight+"px' >"+
							"<div id='top' ondblClick='maxim(\""+apps[i].name+"\");'>"+
								"<div id='icon'><img src='"+apps[i].icon+"' width='20px' height='20px' alt='' /></div>"+
								"<div id='name'>"+apps[i].name+"</div><div id='space'></div>"+
								"<button   onClick='closeApp(\""+apps[i].name+"\");' id='close'>"+
									"<img src='images/close.png' width='24' height='24' />"+
								"</button>"+
								"<button onClick='maxim(\""+apps[i].name+"\");' id='maximize'>"+
									"<img src='images/maximize.png' width='24' height='24' />"+
								"</button>"+
								"<button   onClick='minim(\""+apps[i].name+"\");' id='minimize'>"+
									"<img src='images/minimize.png' width='24' height='24' />"+
								"</button>"
							+"</div>"+
							"<div id='appMain' style='overflow: auto;'>sd</div>"
						+"</div>";
	var elet = "."+apps[i].name+" #appMain";
	if(apps[i].opened === false){
		// open the new app
		$('#desktop').append(appContent);
		$("."+apps[i].name).css({"left":apps[i].positionDesX});
		$("."+apps[i].name).css({"top":apps[i].positionDesY});
		$("."+apps[i].name).draggable({containment: "#desktop",handle:"#top"}).resizable({alsoResize:elet});
		$("."+apps[i].name).mousedown(clickedApp);
		//if(apps[i] != 'HtmlExplorer')
		$('.'+apps[i].name).resize(resizedApp);
		apps[i].opened = true;
		apps[i].maximized = false;
		apps[i].minimized = false;
		
		// adjust the sizes
		$('.'+apps[i].name).css({"height":apps[i].appHeight});
		$('.'+apps[i].name).css({"width":apps[i].appWidth});
		$('.'+apps[i].name+" #appMain").css({"height":apps[i].appHeight-45});
		$('.'+apps[i].name+" #appMain").css({"width":apps[i].appWidth-10});
		totalWidth = document.documentElement.clientWidth ;
		totalHeight = (document.documentElement.clientHeight == 0) ? window.innerHeight : document.documentElement.clientHeight;
		$('.'+apps[i].name+' #appMain').load(apps[i].appFile);
		/*$('.'+apps[i].name+' #appMain').load(apps[i].appFile, function(response, status, xhr) {
				//alert(status);
			  if (status == "error") {
				var msg = "Sorry but there was an error: ";
				alert(msg + xhr.status + " " + xhr.statusText);
			  }
			});*/
		// if this app is not pinned, add it to the start bar
		if(apps[i].startBarIcon === false){
			var content = "<div class='startBarApp' onClick='openApp(\""+apps[i].name+"\");' name='"+apps[i].name+"'>"+
							"<img src='"+apps[i].icon+"' alt='a'"+
							" width='"+apps[i].width+"px' height='"+apps[i].height+"px' "
						+" /></div>";
			$('#sortStartBar').append(content);
		}
		
		// add the app the the queue
		openedApps[openedApps.length] = apps[i];
		setZIndex(apps[i].name);
		// now focus the app
		$('.startBarApp[name="'+name+'"]').addClass('active');
		
	}else{
		// this call is either to minimise the opened one or open the minimized one
		// now show the minimized one
		if(apps[i].minimized === true){
			/*$("."+name).show('drop', {
				direction :'down',
				duration: 100,
				easing: 'linear', 
			});*/
			$("."+name).fadeIn("fast");
			apps[i].minimized = false;
			setZIndex(name);
		}else{
			// check if some other app is laying over it or not
			var ok = true;
			for(var k=0; k<openedApps.length; k++)
				if(openedApps[k].name === name)
					break;
			
			var top = $('.'+name).offset().top;
			var left = $('.'+name).offset().left;
			var lefte = $('.'+name).offset().left + $('.'+name).width();
			var tope = $('.'+name).offset().top + $('.'+name).height();
			if(openedApps[openedApps.length-1].name != name){
				for(var j=0; j<openedApps.length && ok; j++){
					if(j!=k){
						var top1 = $('.'+openedApps[j].name).offset().top;
						var left1 = $('.'+openedApps[j].name).offset().left;
						var left2 = $('.'+openedApps[j].name).offset().left + $('.'+name).width();
						var top2 = $('.'+openedApps[j].name).offset().top + $('.'+name).height();
						if(((top>top1&&top<top2)||(left>left1&&left<left2 ))||((tope>top1 && tope<top2) || (lefte>left1 && lefte<left2 )) ){
							var temp = openedApps[k];
							
							openedApps.remove(k);
							openedApps[openedApps.length] = temp;
							
							for(var j=openedApps.length-1; j>=0; j--){
								/*if( typeof $('.'+openedApps[j]) === 'undefined' );
								else*/{
									$('.'+openedApps[j].name).css({"z-index":j+2});
									if(j === openedApps.length-1){
										$('.'+openedApps[openedApps.length-1].name).css({"background":"#05cdf2"});
									}else $('.'+openedApps[j].name).css({"background":"#7BC7D5"});
								}
							}
							ok = false;
							
						}					
					}
				}
			}
			if(ok){
				minim(apps[i].name);
				apps[i].minimized = true;
			}
		}
	}
	
}

function maxim(name){
	// this will be called before the clickedApp function
	// check the app's position
	for(var i=0; i<apps.length; i++)
		if(apps[i].name === name)
			break;
	if(apps[i].maximized === false){
		$('.'+name).css({"top":"0px"});
		$('.'+name).css({"left":"0px"});
		$('.'+name+" #maximize img").attr("src","images/restore.png");
		$('.'+name).css({"width":totalWidth-2});						// 2 is for border		
		totalHeight = (document.documentElement.clientHeight == 0) ? window.innerHeight : document.documentElement.clientHeight;
		$('.'+name).css({"height":totalHeight-startBarHeight-2});		// 2 is for border
		$('.'+name+" #appMain").css({"width":totalWidth-10});			// 10 is for margin
		$('.'+name+" #appMain").css({"height":totalHeight-startBarHeight-45});	// 35 is for top and 10 is for margin
		apps[i].maximized  = true;
	}else{
		$('.'+name).css({"top":apps[i].positionDesY});
		$('.'+name).css({"left":apps[i].positionDesX});
		$('.'+name+" #maximize img").attr("src","images/max.png");
		$('.'+apps[i].name).css({"height":apps[i].appHeight});
		$('.'+apps[i].name).css({"width":apps[i].appWidth});
		$('.'+apps[i].name+" #appMain").css({"height":apps[i].appHeight-45});
		$('.'+apps[i].name+" #appMain").css({"width":apps[i].appWidth-10});
		apps[i].maximized  = false;
	}
	setZIndex(name);
}

function minim(name){
	minbool = true;
	// check the app's position
	for(var i=0; i<apps.length; i++)
		if(apps[i].name === name)
			break;
			
	apps[i].minimized = true;
	$("."+name).hide('drop', {
			direction :'down',
			duration: 100,
			easing: 'linear', 
		});
		
	decreaseZIndex(name);

}

function closeApp(name){
	var i=0; var j=0;
	for(i=0; i<apps.length; i++)
		if(apps[i].name === name)
			break;
	apps[i].opened = false;
	$('.startBarApp[name="'+name+'"]').removeClass('active');
	$("#desktop ."+apps[i].name).remove();
	
	
	// if one is app is not pinned, remove from startbar
	if(apps[i].startBarIcon === false){
		$('.startBarApp[name="'+apps[i].name+'"]').remove();
	}
	
	// remove from startBarApps
	for(j=0; j<startBarApps.length; j++)
		if(startBarApps[j].name === name)
			break;
	startBarApps.remove(j);
	
	// remove from openedApps
	for(j=0; j<openedApps.length; j++)
		if(openedApps[j].name === name)
			break;
	openedApps.remove(j);
	
	updateZIndexes();
	$('#startBarAppClose').fadeOut();
}

function resizedApp(){
	// get the class name
	var name = String ($(this).attr('class').toString());
	name = name.substr(0,$(this).attr('class').toString().indexOf(' ',0));
	
	// get the index
	for(var i=0; i<apps.length; i++)
		if(apps[i].name === name)
			break;
	// change the icon
	if($('.'+name).width() < totalWidth-2 || $('.'+name+" #appMain").height() < totalHeight-startBarHeight-45 ){
		$('.'+name+" #maximize img").attr("src","images/maximize.png");	
		apps[i].maximized = false;
	}else{
		$('.'+name+" #maximize img").attr("src","images/restore.png");
		apps[i].maximized = true;
	}
	
}

function clickedApp(){
	// change the z index
	var name = String ($(this).attr('class').toString());
	name = name.substr(0,$(this).attr('class').toString().indexOf(' ',0));
	//alert($('.'+name).css('display'));
	if(minbool){
		// no need to do anything
	}else{
		var i;
	for(i=0; i<openedApps.length; i++)
		if(openedApps[i].name === name)
			break;
	
		var temp = openedApps[i];
		// move the openedApps array correctly
		openedApps.remove(i);
		openedApps[openedApps.length] = temp;
		
		for(var j=openedApps.length-1; j>=0; j--){
			/*if( typeof $('.'+openedApps[j]) === 'undefined' );
			else*/{
				$('.'+openedApps[j].name).css({"z-index":j+2});
				if(j === openedApps.length-1){
					$('.'+openedApps[openedApps.length-1].name).css({"background":"#05cdf2"});
				}else $('.'+openedApps[j].name).css({"background":"#7BC7D5"});
			}
		}
	}
	minbool = false;
}

// end of Application functions



/***************** Z-Indices *******************************/

function setZIndex(name){
	// take the i'th app from the openedApps array and put it in the end of the openedApps
	var i;
	for(i=0; i<openedApps.length; i++)
		if(openedApps[i].name === name){
			break;
		}
	
	var temp = openedApps[i];
	
	openedApps.remove(i);
	openedApps[openedApps.length] = temp;
	
	// set the index for everything from the beginning
	for(var j=0; j<openedApps.length; j++){
		/*if( typeof $('.'+openedApps[j]) === 'undefined');
		else */{
			$('.'+openedApps[j].name).css({"z-index":j+2});
			if(j === openedApps.length-1){
				$('.'+openedApps[openedApps.length-1].name).css({"background":"#05cdf2"});
			}else $('.'+openedApps[j].name).css({"background":"#7BC7D5"});
		}
	}
}

function decreaseZIndex(name){
	// take the i'th app and put it in the beginning of the openedApps
	var i;
	for(i=0; i<openedApps.length; i++)
		if(openedApps[i].name === name)
			break;
	
	var temp = openedApps[i];
	// move the openedApps array correctly
	openedApps.remove(i);
	openedApps[openedApps.length] = new Application();
	for(var j=openedApps.length-1; j>=1; j--){
		openedApps[j] = openedApps[j-1];
	}openedApps[0] = temp;
	
	for(var j=openedApps.length-1; j>=0; j--){
		/*if( typeof $('.'+openedApps[j]) === 'undefined' );
		else*/{
			$('.'+openedApps[j].name).css({"z-index":j+2});
			if(j === openedApps.length-1){
				$('.'+openedApps[openedApps.length-1].name).css({"background":"#05cdf2"});
			}else $('.'+openedApps[j].name).css({"background":"#7BC7D5"});
		}
	}
}

function updateZIndexes(){
	// for all the openedApps decrease the z-index by 1, and for app with max z-index add the class 'active'
	for(var j=openedApps.length-1; j>=0; j--){
		/*if( typeof $('.'+openedApps[j]) === 'undefined' );
		else*/{
			$('.'+openedApps[j].name).css({"z-index":j+2});
			if(j === openedApps.length-1){
				$('.'+openedApps[openedApps.length-1].name).css({"background":"#05cdf2"});
			}else $('.'+openedApps[j].name).css({"background":"#7BC7D5"});
		}
	}
}

// end of Z-Indices

/******************* For Desktop **************************/
function drawWindows(){
	
	var desktopContent = "";
	for(var i=0; i<apps.length; i++){
		if(apps[i].desktopIcon === true){
			desktopContent += "<div class='desktopApp' ondblClick='openApp(\""+apps[i].name+"\");' name='"+apps[i].name+"'>"+
									"<img src='"+apps[i].icon+"' alt='a'"+
									" width='"+(apps[i].width+15)+"px' height='"+(apps[i].height+10)+"px' "
								+" /></div>";
		}
	}
	$("#desktop").append(desktopContent);
}
// end of desktop

function resize(){
	document.addEventListener('click',mouseClicked, false);
	document.addEventListener('mousemove',mouseMoved, false);
	document.addEventListener('mouseup',mouseUp, false);
	document.addEventListener('mousedown',mouseDown, false);
	$('#windows').css({"height":totalHeight});
	$('#login').css({"height":totalHeight});
	$('#start').css({"height":totalHeight});	
	$('img').bind('dragstart', function(event) { event.preventDefault(); return false; });
	totalHeight = (document.documentElement.clientHeight == 0) ? window.innerHeight : document.documentElement.clientHeight;
	totalHeight = window.innerHeight;
	var ht = totalHeight - startBarHeight;
	$('#startbar').css({"top":ht});
	$('#desktop').css({"height":ht});
}

/*****************************************************************************************************/
// mouselisteners

function mouseDown(e){
	
}

function mouseUp(e){
	
}

function mouseMoved(e){
	// use it for hover
	var x = e.pageX;
	var y = e.pageY;
	
	if(y>=totalHeight-startBarHeight && y<=totalHeight){ // it is start Bar
		// find over which application
		if(x>=0 && x<40){	// it is start menu
				
		}else{
			x -= 40;
			// each 48 pixel is for one application	
			var widthOfApp = $('.startBarApp').outerWidth(true);
			var pos = parseInt(x/widthOfApp);
			var noOfApps = startBarApps.length;
			if(pos < noOfApps){
				//$('#desktop').text("App hovered is : "+startBarApps[pos].name);
			}
		}
		
	}else{
		
	}
	
}

// right click menu
function rightClick(e){
	var x = e.pageX;
	var y = e.pageY;
	//return false;
}

// left click menu
function leftMouse(e){
	var x = e.pageX;
	var y = e.pageY;
	
	if(startMenuIsTrue === false){
		$("#startMenu").css({"z-index":0});
	}else{
			
	}
	startMenuIsTrue = false;
	
}
// middle click menu
function middleMouse(e){
		
}

// common click function
function mouseClicked(e){
	switch(e.which){
			case 1:
				leftMouse(e);
				break;
			case 2:
				middleMouse(e);
				break;
	}	
}