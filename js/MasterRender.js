define([], function(renderModule){
	var ret,
		loopTimer,
		i,
		len,
		play,
		pause,
		updateGame,
		addModule,
		liveModules = [],
		FPS = 25,//Should be stored and read in a "settings" module for centralized game modification
        frame = 0,
        currentFPS = 0,
        currentTime = 0,
        updateTime = 0;


    addModule = function(module){
    	//adds a render module to the que. Could be a spawned enemy at runtime, or an animated background when initating the game.
    	liveModules.push(module);
    };

    /*removeModule = function(moduleIdentifyer){
		//runs through the liveModules and removes the module from the que. Could be an enemy onDestroy etc.
    };*/

    updateGame = function(){
    	len = liveModules.length;
		currentTime = new Date().getTime();
            if (++frame >= FPS) {
                frame = 0;
            }
            updateTime = new Date().getTime() - currentTime;
            currentFPS = 1000.0 / updateTime;
            if (currentFPS > FPS) {
                currentFPS = FPS;
            }
            for(i=len; --i>=0;){
            	console.log(liveModules[i]); //todo. call Render	
            }
            loopTimer = setTimeout(updateGame, (1000.0 / FPS) - updateTime);
    };

	play = function(){
		updateGame();
	};
	pause = function(){
		clearTimeout(loopTimer);
	};




	ret = {
		play: play,
		addModule: addModule,
		pause: pause
	};

	return ret;
});