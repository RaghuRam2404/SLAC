<html>
<head>
<link rel="stylesheet" href="css/apps/explorer.css" />
<script type="text/javascript" src="js/explorer.js"></script>
<style>

#linkaddress{
	display: -webkit-box;
	-webkit-box-flex: 0;
	display: -moz-box;
	-moz-box-flex: 0;
	display: -o-box;
	-o-box-flex: 0;
	margin: 0 5px;
	padding: 0px 10px;
	background-color:#966;
	border: 1px solid #000;
}

</style>
</head>
<body>
<div id="wrapper">
    <div id="explorer">
        <div id="topCont" oncontextmenu="alert()" >
        	<div id="back" > 
            	<button id="goback" disabled onClick="goback()" > 
                	<img src="images/back.png" width="20" height="20" /> 
                 </button>
            </div>
            <div id="front"> 
            	<button id="gofront" disabled onClick="gofront()"> 
                	<img src="images/forward.png"  width="20" height="20"  /> 
                </button> 
            </div>
            <div id="address">
            	<div id="compimg"></div>
            	<div id="curraddress"><div id="linkaddress">asdfewrw3res</div></div>
            </div>
        </div>
        <div id="contents">
            <div id="sideContent">
                
            </div>    	
            <div id="expContent">
            </div>
        </div>
        <div id="footer">
        	<div id="icon">
            	<img src="images/folder.png" height="50" width="50" />
            </div>
            <div id="details">
            	<div id="folder"></div>
            	<div id="file"></div>
            </div>
            <div id="rights">
            	<div id="mail"><a style="text-decoration:none;" href="mailto:taslers2013@slac2013.tk">taslers2013@slac2013.tk</a></div>
                <div id="copyrights">&copy; TaSLers</div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
	setExplorerContents(true);
</script>
</body>
</html>