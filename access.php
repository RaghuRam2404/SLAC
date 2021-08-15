        	<?php
			
			
				$selector = "";
				$url = "";
				require("connect.php");
				if(!isset($_POST['url']) ){
					// choose from the beginning
					$query = 'select * from slac.base where sid = 1;';
					$res = mysql_query($query) or die(mysql_error());
					while($r = mysql_fetch_assoc($res)){
						$url = $r['baselink'];
						$selector = $r['param'];
					}
					
					include ('phpparser/simple_html_dom.php');
					$html = file_get_html($url);
					
					// Find all images 
					foreach($html->find($selector) as $element) {
						  // echo '<div ondblClick="loadPage(\''.$element->href.'\', true)" >'.$element->href.' </div>'. $element->innertext .'<br>';
						   echo "<div class='explorerApp' name='".$element->innertext."' onclick='clickedExplorerApp(\"".$element->innertext."\")' ".
								" ondblclick='loadPage(\"".$element->href."\",true)' >".
								"<img src=\"images/folder.png\" alt=\"".$element->innertext."\" height=\"80\" width=\"80\"  />".
								"<div id=\"link\">".$element->innertext."</div>".
								"</div> ";
					}
				}else{
					$url = $_POST['url'];
					$cont = "";
					if(preg_match("*http*",$url) || preg_match("*www.*",$url) || preg_match("*https*", $url) );
					else{
							$query = 'select * from slac.base where sid = 1;';
							$res = mysql_query($query) or die(mysql_error());
							while($r = mysql_fetch_assoc($res)){
								$url1 = $r['baselink'];
								$selector = $r['param'];
							}
							$url = $url1.$url;
					}
					// get all the matchers
					$query = "select * from matchlist where sid = 1";
					$res = mysql_query($query);
					$flag = false;
					while($r = mysql_fetch_assoc($res)){
						
						if(strlen(strstr($url,$r['matcher'])) > 0){
						}else{
							$flag = true; 
							$selector = $r['param'];
						}
					}
						
						
					if($flag){
						include ('phpparser/simple_html_dom.php');
						$html = file_get_html($url);
						foreach($html->find($selector) as $element){ 
							   //echo  '<div ondblClick="loadPage(\''.$element->href.'\', true)" >'.$element->href.' </div>'. $element->innertext .'<br>';
							    echo "<div class='explorerApp' name='".$element->innertext."' onclick='clickedExplorerApp(\"".$element->innertext."\")' ".
								" ondblclick='loadPage(\"".$element->href."\",true)' >".
								"<img src=\"images/folder.png\" alt=\"".$element->innertext."\" height=\"80\" width=\"80\"  />".
								"<div id=\"link\">".$element->innertext."</div>".
								"</div> ";
						}
						
						echo "<script type='text/javascript'>
								for(var i=0; i<apps.length; i++)
									if(apps[i].name === name);
										break;
								apps[i].appFile = \"".$url."\";
								</script>";
								echo "<div class='explorerApp' name='Other' onclick='clickedExplorerApp(\"Others\")' ".
								" ondblclick='openApp(\"Others\")' >".
								"<img src=\"images/file.png\" alt=\"Others\" height=\"80\" width=\"80\"  />".
								"<div id=\"link\">".(substr($url,0,10).'...')."</div>".
								"</div> ";
					}else{
						echo "<script type='text/javascript'>
								var a1 = new Application();
								a1.name = ".$url.";
								a1.appFile = ".$url.";
								a1.icon = 'images/file.png';
								a1.desktopIcon = false;
								a1.startMenuIcon = false;
								a1.startBarIcon = false;
								a1.appWidth = 700;
								a1.appHeight = 550;
								a1.positionDesX = 0;
								a1.positionDesY = 0;
								a1.maximized = false;
								a1.startBarPosition = 1;
								apps[apps.length] = a1; alert('".$url."'); </script>";
								echo "<div class='explorerApp' name='".$url."' onclick='clickedExplorerApp(\"".$element->innertext."\")' ".
								" ondblclick='openApp(\"".$url."\")' >".
								"<img src=\"images/file.png\" alt=\"".$url."\" height=\"80\" width=\"80\"  />".
								"<div id=\"link\">".$url."</div>".
								"</div> ";
								
								
								
					}
					/*$return['msg'] = $cont;
					echo json_encode($return);
					exit();*/
					
				}
				
			?>