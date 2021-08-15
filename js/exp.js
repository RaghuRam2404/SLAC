// JavaScript Document
var explorer = [];
var totalHeight = 0;
var selectOption = "";
var backstack = [];
var forwardstack = [];
history = [];

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
	//setExplorerContents(false);
	loadPage(selectOption,false);
	updateButtons();
}

function gofront(){
	var prev = forwardstack.pop();
	backstack.push(prev);
	selectOption = prev;
	//setExplorerContents(false);
	loadPage(selectOption,false);
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
		///backstack.push(selectOption);
		updateButtons();
	}
	
	//$('#expContent').load("access.php");
	loadExp(true);
	// set the icons
	var folder = 0;
	/*for(var i=0; i<explorer[selectOption].length; i++){
		if(explorer[selectOption][i].type)
			folder++;
	}$('#details #folder').html("No of Folder/s : "+folder);
	$('#details #file').html("No of File/s : "+(explorer[selectOption].length-folder));*/
}
function setBar(){
	
	$('#curraddress').html("");		
	for(var i=0; i<backstack.length; i++){
		if(backstack[i]==="")
			$('#curraddress').append("<div id='linkaddress' >NewBoston</div>");
		else
			$('#curraddress').append("<div id='linkaddress' >"+backstack[i]+"</div>");
	}	
}
function loadExp(bl){
		 if(bl) backstack.push("");
		 updateButtons();
		 $("#expContent").load("access.php", function(response, status, xhr) {
			if (status == "error") {
				var msg = "Sorry but there was an error: ";
				alert(msg + xhr.status + " " + xhr.statusText);
			  }
			});	
		setBar();
}

function loadPage(linkaddress, bl){
	if(linkaddress === ""){ loadExp(false); return; }
		$('#expContent').load("access.php", { 'url': linkaddress }, function(response, status, xhr) {
					  // insert link address into the stack
					  if(bl){
							forwardstack = [];		
							backstack.push(linkaddress);
							updateButtons();
					  }else
					  	backstack.push(linkaddress);
					 	updateButtons();
						setBar();
					  if (status == "error") {
						var msg = "Sorry but there was an error: ";
						alert(msg + xhr.status + " " + xhr.statusText);
					  }
		});
}



// replica


// end

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

