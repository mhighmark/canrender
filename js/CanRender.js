var CanRender = function(specObj){
	'use strict'
	var _style, _cvs, _ctx, _widthFactor, _heightFactor,_init, _container, _currentTime, _updateTime, _FPS, _frame, _currentFPS;

	//private variables
	_FPS = specObj.fps;
	_frame = 0;

	//instance variables
	self.specObj = specObj;
	self.renderTimer;
	self.activeModules = [];

 	_init = function(newRenderModule){
 		_container = document.querySelector('div[data-can-render]');
		_style = _container.style;
		_style.position='absolute';
		_style.left = 0;
		_style.right = 0;
		_style.top = 0;
		_style.bottom = 0;

		//init master render canvas, and set scaling
		_widthFactor = window.innerWidth/self.specObj.designWidth;
		_heightFactor = window.innerWidth/self.specObj.designHeight;
		_cvs = document.createElement('canvas'); 
		if(!!self.specObj.fullScreen){
			_cvs.width = window.innerWidth;
			_cvs.height = window.innerHeight;
		}
		_container.appendChild(_cvs);
		_ctx = _cvs.getContext('2d');
		_ctx.scale(_widthFactor,_heightFactor);
 	};

 	this.play = function(newRenderModule){
 		self.Render();
 	};
 	this.pause = function(newRenderModule){
 		clearTimeout(self.renderTimer);
 	};

	self.renderModules = function(){
		var module, i, len = self.activeModules.length;
		for(i=len; --i>=0;){
			module = self.activeModules[i];
			_ctx.drawImage(module.Render(), module.drawX,module.drawY);
		}
	};

 	self.Render = function(){
 		_ctx.clearRect(0,0,_cvs.width, _cvs.height);
 		_currentTime = new Date().getTime();
	    if ( ++_frame >= _FPS ){
	        _frame = 0;     
	    }
    	_updateTime = new Date().getTime() - _currentTime;
	    _currentFPS = 1000.0 / _updateTime;
    	if ( _currentFPS > _FPS ) {
	    	_currentFPS = _FPS;
	    }
	    setTimeout(self.Render, (1000.0/_FPS) - _updateTime);
	    self.renderModules();
	};

	_init();

	this.getModuleByName = function(name){

	};
	this.getElmByName = function(name){

	};

	//Render Modules
	this.newModule = function(specObj, renderElms){
		var len, i, _renderElms, _cvs;
		var newModule = {};
		newModule.name = specObj.name;
		newModule.drawX = specObj.drawX;
		newModule.drawY = specObj.drawY;
		_cvs = document.createElement('canvas');
		_cvs.width = specObj.width;
		_cvs.height = specObj.height;
		_renderElms = (function(){
			var i, returnElms = [], len = renderElms.length;
			if(len){
				for(i=len;--i>=0;){
					returnElms.push(createElm(renderElms[i]));
				}
			}
			else{
				returnElms.push(createElm(renderElms));
			}
			function createElm(specObj){
				var _cvs, _tileWidth,_tileHeight,_ctx, _img, elm = {};
				_tileWidth = specObj.tileWidth;
				_tileHeight = specObj.tileHeight;
				_img = new Image();
				_img.src = specObj.src;
				
				elm.drawX = specObj.drawX;
				elm.drawY = specObj.drawY;
				_cvs = document.createElement('canvas');
				_cvs.width = specObj.tileWidth;
				_cvs.height = specObj.tileHeight;
				_ctx = _cvs.getContext('2d');
				elm.Render = function(){
					_ctx.drawImage(_img, elm.drawX, elm.drawY);
					return(_cvs);
				};
				return elm;
			};
			return returnElms;
		})();
		newModule.Render = function(){
			len = _renderElms.length;
			for(i=len;--i>=0;){
				_ctx.drawImage((_renderElms[i].Render()), 0,0);
			}
			return _cvs;
		};
		self.activeModules.push(newModule);
	};
};

