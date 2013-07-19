define([], function(){
	var ret, cvs, _ctx, _width, _height, drawX, drawY;
	_width = 200;
	_height = 200;
	drawX = 50;
	drawY = 250;
	cvs = document.createElement('canvas');
	cvs.width = _width;
	cvs.height = _height;
	_ctx = cvs.getContext('2d');

	var Render = function(){
		return cvs;
	};

	ret = {
		name: 'renderModule2',
		drawX: drawX,
		drawY: drawY,
		Render: Render
	};


	return ret;
});