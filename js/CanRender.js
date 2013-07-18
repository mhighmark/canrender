define(['require', 'GameCommandHub'], function(require, cmdHub){
	
	//instantiate renderModules and add them to game
	var myModule = require(['RenderModule1'], function(renderModule1){
		cmdHub.signal(cmdHub.signals.ADDMODULE, renderModule1); 
	});
	var myModule = require(['RenderModule2'], function(renderModule2){
		cmdHub.signal(cmdHub.signals.ADDMODULE, renderModule2);
	});

	//start the main loop
	cmdHub.signal(cmdHub.signals.STARTGAMELOOP);
});