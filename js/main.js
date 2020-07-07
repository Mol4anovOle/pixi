var width =window.innerWidth/2;
var height = window.innerHeight/2;
var app;
var colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];
var gravity = 4;
var figuresAmount = -1;
var figure = [];
$(document).mousemove(function(e){
    var X = e.pageX; // положения по оси X
    var Y = e.pageY; // положения по оси Y
    console.log("X: " + X + " Y: " + Y); // вывод результата в консоль
});
var model = {
    createCanvas: function() {
        app = new PIXI.Application(width, height);
        document.getElementById('game-area').appendChild(app.view);
    },
    drawFigure: function(){
        rand = Math.floor(Math.random() * colors.length);
        var radius=50;
        var inAreaX = width - 100;
        var circleY = -50;
        var circleX = Math.floor(Math.random() * inAreaX);
        var circle = new PIXI.Graphics();
        circle.lineStyle(0);
        circle.beginFill(colors[rand], 1);
        circle.drawCircle(circleX, circleY, radius);
        circle.endFill();

        var elipse = new PIXI.Graphics();
        elipse.lineStyle(0);
        elipse.beginFill(colors[rand], 1);
        elipse.drawEllipse(circleX, circleY/2, radius, radius/2);

        var rect = new PIXI.Graphics();
        rect.lineStyle(0);
        rect.beginFill(colors[rand], 1);
        rect.drawRect(circleX, circleY, radius, radius);

        var hexagon = new PIXI.Graphics();
        hexagon.lineStyle(0);
        hexagon.beginFill(colors[rand], 1);
        hexagon.drawPolygon( [
            new PIXI.Point(circleX-radius/2, circleY-radius),
            new PIXI.Point(circleX+radius/2, circleY-radius),
            new PIXI.Point(circleX+radius, circleY),
            new PIXI.Point(circleX+radius/2, circleY+radius),
            new PIXI.Point(circleX-radius/2, circleY+radius),
            new PIXI.Point(circleX-radius, circleY),
            new PIXI.Point(circleX-radius/2, circleY-radius),
        ]);

        var triangle = new PIXI.Graphics();
        triangle.lineStyle(0);
        triangle.beginFill(colors[rand], 1);
        triangle.drawPolygon( [
            new PIXI.Point(circleX, circleY),
            new PIXI.Point(circleX-radius/2, circleY-radius),
            new PIXI.Point(circleX+radius/2, circleY-radius),
            new PIXI.Point(circleX, circleY),

        ]);

        var pentagon = new PIXI.Graphics();
        pentagon.lineStyle(0);
        pentagon.beginFill(colors[rand], 1);
        pentagon.drawPolygon( [
            new PIXI.Point(circleX, circleY-radius),
            new PIXI.Point(circleX+2*radius/3, circleY-2*radius/3),
            new PIXI.Point(circleX+radius/3, circleY+radius/3),
            new PIXI.Point(circleX-radius/3, circleY+radius/3),
            new PIXI.Point(circleX-2*radius/3, circleY-2*radius/3),
            new PIXI.Point(circleX, circleY-radius),

        ]);

        var figures=[circle, elipse, rect, hexagon, triangle,pentagon];
        shapeRand = Math.floor(Math.random() * figures.length);
        figures[shapeRand].interactive = true;
        figures[shapeRand].buttonMode = true;
        figures[shapeRand].live = true;
        figuresAmount++;
        figures[shapeRand].num = figuresAmount;
        figure.push(figures[shapeRand]);
        app.stage.addChild(figures[shapeRand]);
        figures[shapeRand].on('pointerdown', controller.clearFigure);
    },

}
var view = {
    loadGame: function() {
        model.createCanvas();
        model.drawFigure();


        setInterval(model.drawFigure, 500);

        app.ticker.add(function() {
            for (var i = 0; i < figuresAmount; i++) {
                figure[i].position.y += gravity;


            }
        });
    }
}


var controller = {
    clearFigure: function() {
        this.clear();
        figure[this.num].live = false;

    },
    addFigure: function(){

    },

}

view.loadGame();

$('canvas').ready(function(){
    console.log("ready");
    $(this).appendTo('game-area');
});