// application file
var apps = [];

// Application file
function Application(){
	this.name = "";
	this.appFile = "";
	this.icon = "";
	this.desktopIcon = false;
	this.startBarIcon = false;
	this.startMenuIcon = false;
	this.opened = false;
	this.appWidth = 300;
	this.appHeight = 250;
	this.minimized = false;
	this.maximized = false;
	this.positionDesX = 0;
	this.positionDesY = 0;
	this.height = 35;
	this.width = 35;
	this.startBarPosition = -1;
}

Application.prototype.isDesktopIcon = function(){
	if(this.desktopIcon) return true;
	return false;	
}

Application.prototype.isStartMenuIcon = function(){
	if(this.startMenuIcon) return true;
	return false;	
}

Application.prototype.isStartBarIcon = function(){
	if(this.startBarIcon) return true;
	return false;	
}

Application.prototype.isOpened = function(){
	if(this.opened) return true;
	return false;	
}

// end of Application 


/// Applications
a1 = new Application();
a1.appFile = "apps/calci.html";
a1.name = "calci";
a1.icon = "images/calculator.png";
a1.desktopIcon = true;
a1.startMenuIcon = true;
a1.startBarIcon = true;
a1.positionDesX = 10;
a1.positionDesY = 10;
a1.maximized = false;
a1.startBarPosition = 3;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "videoPlayer";
a1.appFile = "apps/video/video.html";
a1.icon = "images/vid.png";
a1.desktopIcon = false;
a1.appWidth = 760;
a1.appHeight = 500;
a1.startMenuIcon = false;
a1.startBarIcon = true;
a1.positionDesX = 30;
a1.positionDesY = 30;
a1.maximized = false;
a1.startBarPosition = 2;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "java";
a1.appFile = "apps/java.html";
a1.icon = "images/java.ico";
a1.desktopIcon = true;
a1.startMenuIcon = true;
a1.startBarIcon = false;
a1.positionDesX = 30;
a1.positionDesY = 30;
a1.maximized = false;
a1.startBarPosition = 2;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "HtmlExplorer";
a1.appFile = "apps/explorer/exptmod.html";
a1.icon = "images/mycomputer.png";
a1.desktopIcon = true;
a1.startMenuIcon = true;
a1.startBarIcon = true;
a1.appWidth = 1000;
a1.appHeight = 550;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 1;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Explorer";
a1.appFile = "apps/explorer/exp.html";
a1.icon = "images/Folder.ico";
a1.desktopIcon = true;
a1.startMenuIcon = true;
a1.startBarIcon = true;
a1.appWidth = 1000;
a1.appHeight = 550;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 1;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "game";
a1.appFile = "apps/game.html";
a1.icon = "images/apps/game.png";
a1.desktopIcon = true;
a1.startMenuIcon = true;
a1.startBarIcon = true;
a1.appWidth = 1000;
a1.appHeight = 550;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Avast";
a1.appFile = "apps/Avast.html";
a1.icon = "images/avast.png";
a1.startBarIcon = false;
a1.appWidth = 400;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;


a1 = new Application();
a1.name = "Avg";
a1.appFile = "apps/Avg.html";
a1.icon = "images/avg.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Bit_Defender";
a1.appFile = "apps/BitDefender.html";
a1.icon = "images/BitDefender.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "CCleaner";
a1.appFile = "apps/CCleaner.html";
a1.icon = "images/CCleaner.png";
a1.startBarIcon = true;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 20;
a1.positionDesY = 20;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Chrome";
a1.appFile = "apps/Chrome.html";
a1.icon = "images/chrome.png";
a1.startBarIcon = true;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 10;
a1.positionDesY = 10;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "DaemonTools";
a1.appFile = "apps/DaemonTools.html";
a1.icon = "images/daemon.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Firefox";
a1.appFile = "apps/Firefox.html";
a1.icon = "images/firefox.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Gtalk";
a1.appFile = "apps/Gtalk.html";
a1.icon = "images/gtalk.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;


a1 = new Application();
a1.name = "IDM";
a1.appFile = "apps/IDM.html";
a1.icon = "images/idm.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "InternetExplorer";
a1.appFile = "apps/InternetExplorer.html";
a1.icon = "images/internet-explorer.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Kaspersky";
a1.appFile = "apps/Kaspersky.html";
a1.icon = "images/kaspersky.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "KMPlayer";
a1.appFile = "apps/KMplayer.html";
a1.icon = "images/kmp.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "MSN";
a1.appFile = "apps/MSN.html";
a1.icon = "images/msn.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Norton";
a1.appFile = "apps/Norton.html";
a1.icon = "images/nortn.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Panda";
a1.appFile = "apps/Panda.html";
a1.icon = "images/panda.jpg";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "RealPlayer";
a1.appFile = "apps/RealPlayer.html";
a1.icon = "images/real2.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Safari";
a1.appFile = "apps/Safari.html";
a1.icon = "images/Safari.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Skype";
a1.appFile = "apps/Skype.html";
a1.icon = "images/skype.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Vlc";
a1.appFile = "apps/Vlc.html";
a1.icon = "images/vlc.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "VMware";
a1.appFile = "apps/VMware.html";
a1.icon = "images/vmware.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "WindowsMedia";
a1.appFile = "apps/WindowsMedia.html";
a1.icon = "images/windows.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Yahoo";
a1.appFile = "apps/Yahoo.html";
a1.icon = "images/yahoo.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Zune";
a1.appFile = "apps/Zune.html";
a1.icon = "images/zune.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;

a1 = new Application();
a1.name = "Others";
a1.appFile = "apps/Zune.html";
a1.icon = "images/file.png";
a1.startBarIcon = false;
a1.appWidth = 700;
a1.appHeight = 400;
a1.positionDesX = 0;
a1.positionDesY = 0;
a1.maximized = false;
a1.startBarPosition = 4;
apps[apps.length] = a1;