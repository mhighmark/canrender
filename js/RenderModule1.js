define(['RenderElement'], function(renderElm){
	var ret, _tileX, _tileY, _animationFrame,_animationColumns,_tileWidth, _tileHeight, cvs, _ctx, _width, _img, _height, drawX, drawY, _sizeFactor;

	//the drawX/Y determine where this canvas will be placed on its parent canvas. 
	//These could be modifyed at runtime to move this canvas in the main scene.
	drawX = 150;
	drawY = 150;
	//Tweaking the rendered size of the sprite. 
	//Max is 1 due to canvas size and to avoid pixelation of image
	_sizeFactor = 1;
	//The size of the sprite sheet frames
	_tileWidth = 200;
	_tileHeight = 200;
    _animationFrame = 0;
     //For a total of 12 zero-based sprite sheet frames
    _lastFrame = 11;
    _animationColumns = 4;
	cvs = document.createElement('canvas');
	cvs.width = _tileWidth;
	cvs.height = _tileHeight;
	_ctx = cvs.getContext('2d');
	_img = new Image();
	_img.src = 'img/cow_sheet.png';

	var Render = function(){
		//Calculate the sprite sheet location
		_tileX = (_animationFrame % _animationColumns) * _tileWidth;
        _tileY = Math.floor(_animationFrame / _animationColumns) * _tileHeight;
        //Draws sprite sheet frame onto canvas. 
        //Notice: Rendering floating point units in the canvas can decrease performance, hence the Math.round()
		_ctx.clearRect(0,0,cvs.width,cvs.height);
		_ctx.drawImage(_img, _tileX, _tileY, _tileWidth, _tileHeight, 0, 0, Math.round(_tileWidth*_sizeFactor), Math.round(_tileHeight*_sizeFactor));
		if (++_animationFrame>_lastFrame) {
            _animationFrame = 0;
        }
		return cvs;
	};

	ret = {
		name: 'renderModule1',
		drawX: drawX,
		drawY: drawY,
		Render: Render
	};


	return ret;
});