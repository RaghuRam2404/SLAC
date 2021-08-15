// JavaScript Document
var explorer = [];
var totalHeight = 0;
var selectOption = "main";
var backstack = [];
var forwardstack = [];
history = [];
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


// add Contents
/**
	os -> Windows -> Software
	              -> some app
	   -> Linux   -> Software
	   	          -> some file 

***/
// single 
function ExpItem(){
	this.name = "";
	this.type;		// true->folder and false->file
	this.icon = "";
}
// end
var name = [];
var temp = [];
var a = new ExpItem();
a.name = "Windows";
a.type = true;
a.icon = "images/folder.png";
temp[temp.length] = a;
var a = new ExpItem();
a.name = "Games";
a.type = true;
a.icon = "images/folder.png";
temp[temp.length] = a;
explorer["main"] = temp;

temp = [];
a = new ExpItem();
a.name = "game"
a.type = false;
a.icon = "images/apps/game.png";
temp.push(a);
explorer["Games"] = temp;


	temp = [];
	a = new ExpItem();
	a.name = "AntiVirus"
	a.type = true;
	a.icon = "images/folder.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Browsers"
	a.type = true;
	a.icon = "images/folder.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Player"
	a.type = true;
	a.icon = "images/folder.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Converters"
	a.type = true;
	a.icon = "images/folder.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Messenger"
	a.type = true;
	a.icon = "images/folder.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Utilities"
	a.type = true;
	a.icon = "images/folder.png";
	temp.push(a);
	explorer["Windows"] = temp;

	temp = [];
	a = new ExpItem();
	a.name = "Avast"
	a.type = false;
	a.icon = "images/avast.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Kaspersky"
	a.type = false;
	a.icon = "images/kaspersky.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Avg"
	a.type = false;
	a.icon = "images/avg.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Norton"
	a.type = false;
	a.icon = "images/nortn.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Panda"
	a.type = false;
	a.icon = "images/panda.jpg";
	temp.push(a);
	a = new ExpItem();
	a.name = "BitDefender"
	a.type = false;
	a.icon = "images/BitDefender.png";
	temp.push(a);
	explorer["AntiVirus"] = temp;

	
	temp = [];
	a = new ExpItem();
	a.name = "Chrome"
	a.type = false;
	a.icon = "images/chrome.ico";
	temp.push(a);
	a = new ExpItem();
	a.name = "Firefox"
	a.type = false;
	a.icon = "images/firefox.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "InternetExplorer"
	a.type = false;
	a.icon = "images/internet-explorer.png";
	temp.push(a);
	a = new ExpItem();
	a.name = "Safari"
	a.type = false;
	a.icon = "images/Safari.png";
	temp.push(a);
	explorer["Browsers"] = temp;

	temp = [];
	a = new ExpItem();
	a.name = "Chrome"
	a.type = false;
	a.icon = "images/chrome.ico";
	temp.push(a);

function updateButtons(){
	if(backstack && backstack.length <= 1){
		$('#goback').attr({'disabled':"disabled"});
	}else $('#goback').removeAttr('disabled');
	if(forwardstack && forwardstack.length <= 0){
		$('#gofront').attr({'disabled':"disabled"});
	}else $('#gofront').removeAttr('disabled');	
}

function goback(){
	var prev = backstack.pop();
	forwardstack.push(prev);
	prev = backstack[backstack.length-1];
	selectOption = prev;
	setExplorerContents(false);
	updateButtons();
}

function gofront(){
	var prev = forwardstack.pop();
	backstack.push(prev);
	selectOption = prev;
	setExplorerContents(false);
	updateButtons();
}

function setExplorerContents(cond){
	// put the history	
	var sideCont = "";
	
		sideCont +=    "<div id='favourites'>"
							+"<div id='head'>FAVOURITES</div>"
							+"<div id='fav' ondblclick='openApp(\"game\")' > <img src='images/apps/game.png' width='20' height='20' /> Game</div>"
							+"<div id='fav' ondblclick='openApp(\"videoPlayer\")'> <img src='images/vid.png' width='20' height='20' /> Video Player</div>"
							+"<div id='fav' ondblclick='openApp(\"calci\")' ><img src='images/calculator.png' width='20' height='20' /> Calculator</div>"
						+"</div>";
	
	
		sideCont += "<div id='slideUpcontents' >"+
        	"<a href='#'>"+
            	"<h3><img src='images/facebook.png' height='40' width='40' alt='' /> <span>Like Us</span></h3>"+
            "</a>"+
        	"<a href='#'>"+
            	"<h3><img src='images/gp.png' height='40' width='40' alt='' /> <span>Add</span></h3>"+
            "</a>"+
        	"<a href='#'>"+
            	"<h3><img src='images/tweet.png'  height='40' width='40' alt='' /><span>Follow Us</span></h3>"+
            "</a>"+
        "</div>";
	$('#sideContent').html(sideCont);
	/// set the contents
	if(cond === true){
		forwardstack = [];		
		backstack.push(selectOption);
		updateButtons();
	}
	// update the address from backstack;
	//"<div id='currAddressLink' onclick='return false;' > "+backstack[i]+"</div>"
	var content = explorer[selectOption];
	var dispCont = "";
	if(typeof content === 'undefined')
		dispCont = "Empty Folder";
	else
		for(var i=0; i<content.length; i++){
			dispCont += "<div class='explorerApp' name='"+content[i].name+"' onclick='clickedExplorerApp(\""+content[i].name+"\")' "+
							" ondblclick='openExpItem(\""+content[i].name+"\","+content[i].type+")' >"+
						"<img src=\""+content[i].icon+"\" alt=\""+content[i].name+"\" height=\"80\" width=\"80\"  />"+
						"<div id=\"link\">"+content[i].name+"</div>"+
						"</div> ";
		}
	$('#expContent').html(dispCont);
	$('#curraddress').html("");		
	for(var i=0; i<backstack.length; i++){
		$('#curraddress').append("<div id='linkaddress' >"+backstack[i]+"</div>");
	}
	
	// set the icons
	var folder = 0;
	for(var i=0; i<explorer[selectOption].length; i++){
		if(explorer[selectOption][i].type)
			folder++;
	}$('#details #folder').html("No of Folder/s : "+folder);
	$('#details #file').html("No of File/s : "+(explorer[selectOption].length-folder));
}

function openLinkItem(nm, val){
	
}

function clickedExplorerApp(nm){
	$('.explorerApp').removeClass('active');
	$('.explorerApp[name="'+nm+'"]').addClass('active');
}

function clickAddress(name){
		selectOption = name;
		setExplorerContents(true);
}

function openExpItem(name, folderType){
	// if it is a folder open it
	if(folderType){
		selectOption = name;
		setExplorerContents(true);
	}
	else{
		openApp(name);	
	}
	// or call openApp()
}

