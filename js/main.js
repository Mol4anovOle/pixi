var width = window.innerWidth / 2;
var height = window.innerHeight / 2;
var app;
var colors = [0x000000, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];
var gravity =10*($('#gravity').val())/10;
var shapescount= $('#shapes').val();
console.log(shapescount);
var figuresAmount = -1;
var figure = [];
var radius = 50;
var inAreaX = 1.5 * width - 100;
var circleY = 0;
var circleX = 0+radius;



// var shapesArea=0;
// var circleSquare = 2*Math.PI*radius;
// var elipseSquare = circleSquare;
// var rectSquare = Math.sqrt(radius);
// var triangleSquare =  (Math.sqrt*(radius))/2;
// var circleSquare = 2*Math.PI*radius;
// var circleSquare = 2*Math.PI*radius;
// console.log(circleSquare);

$('.shapes_plus').click(function () {
    shapescount++;
    $('#shapes').val(shapescount);

});
$('.shapes_minus').click(function () {
    if (shapescount>1){
        shapescount--;
        $('#shapes').val(shapescount);

    } else {
        return false;
    }
});

$('.gravity_plus').click(function () {
    gravity++;
    $('#gravity').val(gravity);

});
$('.gravity_minus').click(function () {
    if (gravity>1){
        gravity--;
        $('#gravity').val(gravity);
    } else {
        return false;
    }
});


var model = {
    createCanvas: function () {
        app = new PIXI.Application(width, height);
        document.getElementById('game-area').appendChild(app.view);
        container = new PIXI.Container();
        container.interactive = true;
        container.hitArea = app.screen;
            app.stage.addChild(container);
        container.on('click', controller.addFigure);

        container.filters=[figure];
    },

    drawSquareCount: function(){
       var displayRect= new PIXI.Graphics();
        displayRect.lineStyle(0);
        displayRect.beginFill(0xFFFFFF);
        displayRect.drawRect(1, 1, width+87, height+112);
        container.addChild(displayRect);
        // var SquareCount=(width+87)*( height+112);
        // console.log(SquareCount);
        // SquareCount.filters=[figure];
        // console.log(SquareCount.filters);
        // var currentSquareCount=SquareCount-SquareCount.filters;
        // // console.log(currentSquareCount);

    },


    drawFigure: function () {
        rand = Math.floor(Math.random() * colors.length);

        var circle = new PIXI.Graphics();
        circle.lineStyle(0);
        circle.beginFill(colors[rand], 1);
        circle.drawCircle(circleX, circleY, radius);
        circle.endFill();



        var elipse = new PIXI.Graphics();
        elipse.lineStyle(0);
        elipse.beginFill(colors[rand], 1);
        elipse.drawEllipse(circleX, circleY / 2, radius, radius / 2);

        var rect = new PIXI.Graphics();
        rect.lineStyle(0);
        rect.beginFill(colors[rand], 1);
        rect.drawRect(circleX, circleY, radius, radius);

        var hexagon = new PIXI.Graphics();
        hexagon.lineStyle(0);
        hexagon.beginFill(colors[rand], 1);
        hexagon.drawPolygon([
            new PIXI.Point(circleX - radius / 2, circleY - radius),
            new PIXI.Point(circleX + radius / 2, circleY - radius),
            new PIXI.Point(circleX + radius, circleY),
            new PIXI.Point(circleX + radius / 2, circleY + radius),
            new PIXI.Point(circleX - radius / 2, circleY + radius),
            new PIXI.Point(circleX - radius, circleY),
            new PIXI.Point(circleX - radius / 2, circleY - radius),
        ]);

        var triangle = new PIXI.Graphics();
        triangle.lineStyle(0);
        triangle.beginFill(colors[rand], 1);
        triangle.drawPolygon([
            new PIXI.Point(circleX, circleY),
            new PIXI.Point(circleX - radius / 2, circleY - radius),
            new PIXI.Point(circleX + radius / 2, circleY - radius),
            new PIXI.Point(circleX, circleY),

        ]);

        var pentagon = new PIXI.Graphics();
        pentagon.lineStyle(0);
        pentagon.beginFill(colors[rand], 1);
        pentagon.drawPolygon([
            new PIXI.Point(circleX, circleY - radius),
            new PIXI.Point(circleX + 2 * radius / 3, circleY - 2 * radius / 3),
            new PIXI.Point(circleX + radius / 3, circleY + radius / 3),
            new PIXI.Point(circleX - radius / 3, circleY + radius / 3),
            new PIXI.Point(circleX - 2 * radius / 3, circleY - 2 * radius / 3),
            new PIXI.Point(circleX, circleY - radius),


        ]);

        var figures = [circle, elipse, rect, hexagon, triangle, pentagon];
        shapeRand = Math.floor(Math.random() * figures.length);
        figures[shapeRand].interactive = true;
        figures[shapeRand].buttonMode = true;
        figures[shapeRand].live = true;
        figuresAmount++;
        figures[shapeRand].num = figuresAmount;
        // var livingShapes=figuresAmount;
        // console.log(livingShapes);
        figure.push(figures[shapeRand]);
        container.addChild(figures[shapeRand]);
        figures[shapeRand].on('click', controller.clearFigure);
        console.log(figure.length);
    },

    drawRandom: function () {
        rand = Math.floor(Math.random() * colors.length);
        inAreaX = 1.5 * width - 100;
        circleY = -50;
        let i=1;
        while (i<=shapescount){
            circleX = Math.floor(Math.random() * inAreaX);
            model.drawFigure(circleY, circleX);
            i++;
        }

    },

}
var view = {
    loadGame: function () {
        model.createCanvas();
        model.drawSquareCount();
        // model.drawFigure();
        model.drawRandom();
        setInterval(model.drawRandom, 5000);

        app.ticker.add(function () {
            for (var i = 0; i < figuresAmount; i++) {
                figure[i].position.y += gravity;

            }
        });
    }
}


var controller = {
    clearFigure: function () {
        this.clear();
        figure[this.num].live = false;
        figuresAmount--;

    },
    addFigure: function () {

        $('#game-area').on("click", function (e) {
            circleX = e.pageX;
            circleY = e.pageY;
            model.drawFigure(circleX, circleY);

        });


    },

}

view.loadGame();

