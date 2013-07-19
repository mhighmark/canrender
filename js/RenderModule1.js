define(['RenderElement'], function(renderElm){
	var ret, cvs, _ctx, _width, _img, _height, drawX, drawY;
	_width = 200;
	_height = 200;
	drawX = 0;
	drawY = 400;
	cvs = document.createElement('canvas');
	cvs.width = _width;
	cvs.height = _height;
	_ctx = cvs.getContext('2d');

	_img = new Image();
	_img.src = 'img/cow_sheet.png'

	var Render = function(){
		_ctx.drawImage(_img, 0,0);
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