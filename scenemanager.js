class SceneManager{
    constructor(game) {
        //Add the current gameEngine as its property.
        this.game = game;
        //Injecting This SceneManager object with its properites back to GameEngine.
        this.game.camera = this;
        //these values are for camera track.
        //go to line 61, they are set to focus on the main charater.
        this.x = 0;
        this.y = 0;

        this.character = new MainCharacter(this.game, 400, 400);

        this.nextNextCutScene = false;
    


        this.listOfSlime = [];

        this.listOfTree = [];

        this.listOfCutTree = [];

        this.listOfDeadTree = [];

        this.listOfSproutTree = [];

        this.listOfSeedGrass = [];

        this.listOfSqroutGrass = [];


        this.listOfMediumGrass = [];


        this.listOfThickGrass = [];

        this.listOfTrippleSoil = [];

        this.listOfDirtGround = [];

        this.listOfBuildings = [];

        this.listOfAnimals = [];

        this.listOfLakeAndOtherSide = new LakeAndOtherSide(this.game);

        this.listOfInvisibleBlocker = [];



        this.normalGrass = new FarmLandNormalGrass(this.game, 0 ,0);
        this.dog = new Dog(this.game,600, 1400, [{ x: randomInt(3800), y: randomInt(0) }, { x: randomInt(3800), y: randomInt(0) }, { x: randomInt(3800), y: randomInt(0) }, { x: 0, y: 0 }]);
        this.wiz = new Wizard(this.game,200, 1400, [{ x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: 0, y: 0 }]);
        this.bor = new Boar(this.game,200, 400, [{ x: 500, y: 500 }, { x: 600, y: 500 }, { x: 700, y: 1200 }]);
        this.gob = new Goblin(this.game,700, 1400, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
        this.greenG = new GreenGoblin(this.game,400, 1550, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
        this.worm = new FireWorm(this.game,100, 1500, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);

        this.loadMap();

  
    };

    loadMap(){
  
        
        //this.game.addEntity(new NextDayCutScene(this));
       

        this.listOfInvisibleBlocker.push(new InvisibleLakeBlocker(this.game));
        for(let i = 0; i < this.listOfInvisibleBlocker.length; i++){
            this.listOfInvisibleBlocker[i].removeFromWorld = false;
            this.game.addEntity(this.listOfInvisibleBlocker[i]);

        }


        


        
        // this.listOfTree.push(new FarmLandBigTree(this.game, 500 ,800));
        // for(let i = 0; i < this.listOfTree.length; i++){
        //     this.listOfTree[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfTree[i]);

        // }

        
        
        

        this.character.removeFromWorld = false;
        this.game.addEntity(this.character);
        // this.game.addEntity(this.dog);
        // this.game.addEntity(this.wiz);
        this.bor.removeFromWorld = false;
        this.game.addEntity(this.bor);
        // this.game.addEntity(this.gob);
        // this.game.addEntity(this.greenG);
        // this.game.addEntity(this.worm);


        //////////////////////////////////DO NOT BLOCK THE MAIN CHARACTER
        
        // this.listOfCutTree.push(new FarmLandCutTree(this.game, 300,200))
        // for(let i = 0; i < this.listOfCutTree.length; i++){
        //     this.listOfCutTree[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfCutTree[i]);

        // }



        // this.listOfDeadTree.push(new FarmLandDeadTree(this.game,400,200))
        // for(let i = 0; i < this.listOfDeadTree.length; i++){
        //     this.listOfDeadTree[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfDeadTree[i]);

        // }


        // this.listOfSproutTree.push(new FarmLandSproutTree(this.game, 900, 800));
        // for(let i = 0; i < this.listOfSproutTree.length; i++){
        //     this.listOfSproutTree[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfSproutTree[i]);

        // }
        

        let houseX = 553;
        let houseY = 530;
        this.listOfBuildings.push(new FarmLandHouse(this.game, houseX, houseY));
        this.listOfBuildings.push(new FarmLandBigHouse(this.game, houseX+120, houseY+70));
        this.listOfBuildings.push(new FarmLandGiantHouse(this.game, houseX-370, houseY-80));
        this.listOfBuildings.push(new FarmLandHouse(this.game, houseX-500, houseY-70));
        this.listOfBuildings.push(new FarmLandStatic(this.game,60,650,StaticType.ANIMAL_WATER));
        this.listOfBuildings.push(new FarmLandStatic(this.game,70,800, StaticType.ANIMAL_Food));

        for(let i = 0; i < this.listOfBuildings.length; i++){
            this.game.addEntity(this.listOfBuildings[i]);
        }

        this.listOfAnimals.push(new FarmLandAnimal(this.game, 400, 400, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 360, 390, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 220, 660, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 100, 655, AnimalType.CHICKEN));
        
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 710, 800, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 750, 750, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 680, 750, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 90, 755, AnimalType.EATINGCOW));
        for(let i = 0; i < this.listOfAnimals.length; i++){
            this.game.addEntity(this.listOfAnimals[i]);
        }
 



        // this.listOfSlime.push(new Slime(this.game, 0,0));
        this.listOfSlime.push(new Slime(this.game, 200,550, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 110, y: 0 }]));

        this.listOfSlime.push(new Slime(this.game, 333,333, [{ x: -50, y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 110, y: 0 }]));
        this.listOfSlime.push(new Slime(this.game, 666,1100, [{ x: 3000, y: 900 }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, {x: 110, y: 0 }]));


        for(let i = 0; i < this.listOfSlime.length; i++){
            this.listOfSlime[i].removeFromWorld = false;
            this.game.addEntity(this.listOfSlime[i]);

        }
        
        
        let soildOffer = 300;
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 175 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 225+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 275+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 325+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 375+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 425+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 475+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 525+ soildOffer));

        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+140, 175+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+ 140, 225+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+ 140, 275+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+ 140, 325+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+ 140, 375+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+ 140, 425+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+ 140, 475+ soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970+ 140, 525+ soildOffer));
        
        for(let i = this.listOfTrippleSoil.length - 1; i >= 0; i--){
            this.listOfTrippleSoil[i].removeFromWorld = false;
            this.game.addEntity(this.listOfTrippleSoil[i]);

        }
      



        



        let offset = 300;
        this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 50, 250 + offset, 5,5 ));
        this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 950, 150 + offset, 7,4 ));
        this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 550, 350 + offset, 4,4 ));

        for(let i = 0; i < this.listOfDirtGround.length; i++){
            this.listOfDirtGround[i].removeFromWorld = false;
            this.game.addEntity(this.listOfDirtGround[i]);

        }

        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 50, 800));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 600, 700));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 850, 550));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 200, 500));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 700, 600));
        
        // Sprout Grass
        this.listOfSqroutGrass.push(new FarmLandSqroutGrass(this.game, 250, 400));
        this.listOfSqroutGrass.push(new FarmLandSqroutGrass(this.game, 1100, 500));
        this.listOfSqroutGrass.push(new FarmLandSqroutGrass(this.game, 400, 550));
        this.listOfSqroutGrass.push(new FarmLandSqroutGrass(this.game, 850, 300));
        this.listOfSqroutGrass.push(new FarmLandSqroutGrass(this.game, 300, 150));
        
        // Medium Grass
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 850, 350));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 500, 400));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 200, 450));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 950, 500));
        
        // Thick Grass
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 850, 450));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300, 350));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 1000, 400));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 200, 350));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 550));
        for(let i = 0; i < this.listOfSeedGrass.length; i++){
            this.listOfSeedGrass[i].removeFromWorld = false;
            this.game.addEntity(this.listOfSeedGrass[i]);

        }


        this.listOfSqroutGrass.push(new FarmLandSqroutGrass(this.game, 400,400));
        for(let i = 0; i < this.listOfSqroutGrass.length; i++){
            this.listOfSqroutGrass[i].removeFromWorld = false;
            this.game.addEntity(this.listOfSqroutGrass[i]);

        }



        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 400,600));
        for(let i = 0; i < this.listOfMediumGrass.length; i++){
            this.listOfMediumGrass[i].removeFromWorld = false;
            this.game.addEntity(this.listOfMediumGrass[i]);

        }
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300,350));
        for(let i = 0; i < this.listOfThickGrass.length; i++){
            this.listOfThickGrass[i].removeFromWorld = false;
            this.game.addEntity(this.listOfThickGrass[i]);

        }


        this.listOfLakeAndOtherSide.removeFromWorld = false;
        this.game.addEntity(this.listOfLakeAndOtherSide);

    
        this.normalGrass.removeFromWorld = false;
        this.game.addEntity(this.normalGrass);
       
        

    }
    draw(ctx){
        //HUB
        ctx.font = '12px "Press Start 2P"';
        // ctx.strokeStyle = "White";
        this.game.ctx.fillStyle = "White";
        this.game.ctx.fillText( "Days  "+ PARAMS.DAYCOUNTER, 10 ,20);
        this.game.ctx.fillText( "Level "+ this.character.level, 10 , 35);

    }
    update(){
        let midpointX = PARAMS.CANVAS_WIDTH/2 ;
        let midpointY = PARAMS.CANVAS_HEIGHT/2 ;
        if(this.game.testSleepCutScene) {
            this.game.addEntityFirst(new NextDayCutScene(this.game));
        }

        if (0 < this.character.x - midpointX && this.character.x + midpointX < 2000 ) {
            
            this.x = this.character.x - midpointX;

        }
        if (0 < this.character.y - midpointY) {
            
            this.y = this.character.y - midpointY;

        }
            
       PARAMS.DEBUG = document.getElementById("debug").checked;

    }

    
}