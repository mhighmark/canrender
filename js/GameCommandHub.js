define(['MasterRender'], function(masterRender){
	// The CommandHub acts a bridge between all the modules and game logic. 
	// When someone somewhere signals that something has happened, the hub makes sure that proper action is taken, 
	// based on signal constant and options object passed to the hub.
	var ret, startGameLoop, signals;

	signals = {
		STARTGAMELOOP: 'startgameloop',
		PAUSEGAMELOOP: 'pausegameloop',
		ADDMODULE: 'addmodule'
	};

	signal = function(newSignal, options){
		switch(newSignal){
			case signals.STARTGAMELOOP:
			masterRender.play();
			break;
			case signals.PAUSEGAMELOOP:
			masterRender.pause();
			break;
			case signals.ADDMODULE:
			masterRender.addModule(options);
			break;
			default:
			console.error('signal: "'+newSignal+'"" not recognized. Options: '+options);
			break;
		}
	};

	ret = {
		signals: signals,
		signal: signal
	};
	return ret;
});