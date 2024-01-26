const LandParts = {
    LEFT: 0,
    CENTER: 1,
    RIGHT: 2
};
const PLANTNAMES = {
    CORN: 0,
    STRAWBERRY: 1,
    RICE: 2
};
class HorizontalSoil{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x;
        this.y = y;
        this.selectedLand = null;
        this.width = 92;
        this.height = 27;
        this.plants = [];
        this.radius = 5;
        this.visualRadius = 50;

        this.plants.push(new StrawberryPlant(this.game,this.x + (92/3)*0,this.y, PARAMS.DAYCOUNTER));
        this.plants.push(new RicePlant(this.game,this.x + (92/3)*1,this.y, PARAMS.DAYCOUNTER));
        this.plants.push(new CornPlant(this.game,this.x + (92/3)*2,this.y, PARAMS.DAYCOUNTER));
        //For Prototype Showcase.
        this.plants.forEach(plant =>{
            plant.startDay = -4;
        });
        // spritesheet
         this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
         this.removeFromWorld = false;

        this.menuPlantShow = false;
        this.menuSelect  = null;
        this.previousLandPartsClick = null;


       this.menuOffsetY = 35;
       this.updateBB();
    }; 
    updateBB(){
        this.BB = new BoundingBox(this.x   - this.game.camera.x , this.y   - this.game.camera.y , this.width, this.height);
      //  console.log(this.BB);
    }

    update(){
        this.updateBB();
    
        // if(this.game.click.x > this.x && this.game.click.x < this.x +92 &&  this.game.click.y > this.game.y && this.click.y < this.y + 27  )
        // {
        //     console.log("click in the Land");
        // }
        this.plants.forEach((thePlant)=>{
            if(thePlant != null)
            thePlant.update(PARAMS.DAYCOUNTER);
        })
        if(this.game.mouse){
        if(this.game.mouse.x > this.x - this.game.camera.x 
            && this.game.mouse.x < this.x + 92 - this.game.camera.x 
            && this.game.mouse.y > this.y - this.game.camera.y
            &&  this.game.mouse.y  < this.y + 27 - this.game.camera.y )
        // if(this.game.mouse.x - this.game.camera.x > this.x 
        //     && this.game.mouse.x - this.game.camera.x< this.x + 92
        //     && this.game.mouse.y - this.game.camera.y> this.y
        //     &&  this.game.mouse.y - this.game.camera.y  < this.y + 27 )
            {   
              //  console.log("in the zone");
                const partWidth = this.width / 3;
                const clickedPart = Math.floor((this.game.mouse.x - this.x + this.game.camera.x ) / partWidth);
                switch (clickedPart) {
                    case LandParts.LEFT:
                        if (this.selectedLand !== LandParts.LEFT) {
                            this.selectedLand = LandParts.LEFT;
                            
                        }
                        break;
                    case LandParts.CENTER:
                        if (this.selectedLand !== LandParts.CENTER) {
                            this.selectedLand = LandParts.CENTER;
                            
                        }
                        break;
                    case LandParts.RIGHT:
                        if (this.selectedLand !== LandParts.RIGHT) {
                            this.selectedLand = LandParts.RIGHT;
                        
                        }
                        break;
                    default:
                        // Default case
                        break;
                }

                if(this.game.mouseClick){
                    //console.log(this.plants[clickedPart].state);
                    if(this.plants[clickedPart] && this.plants[clickedPart].isHarvestable){

                        if(this.plants[clickedPart] instanceof CornPlant ) 
                            this.game.character.farmInventory[PLANTNAMES.CORN] += (Math.floor(Math.random() * 3) + 1);
                        else if(this.plants[clickedPart] instanceof StrawberryPlant ) 
                            this.game.character.farmInventory[PLANTNAMES.STRAWBERRY] += (Math.floor(Math.random() * 3) + 2);
                        else if(this.plants[clickedPart] instanceof RicePlant)
                            this.game.character.farmInventory[PLANTNAMES.RICE] += (Math.floor(Math.random() * 3) + 3);



                       this.plants[clickedPart] = null;  
                       this.menuPlantShow = false;
                       this.game.mouseClick = false;
                       this.game.character.levelUp();
                    }else if(this.plants[clickedPart] == null){
                        this.menuPlantShow = true;
                        this.previousLandPartsClick = clickedPart;
                    }
                   
                }

               
               
            } else {
                this.selectedLand = null;
              //  this.menuPlantShow = false;
            }




        if(this.game.mouse.x > this.x - this.game.camera.x 
            && this.game.mouse.x < this.x + 96 - this.game.camera.x 
            && this.game.mouse.y > this.y - this.game.camera.y -  this.menuOffsetY
            &&  this.game.mouse.y  < this.y + 27 - this.game.camera.y -  this.menuOffsetY && this.menuPlantShow){
               
                const partWidth = 96 / 3;
                const clickedPartMenu = Math.floor((this.game.mouse.x - this.x + this.game.camera.x ) / partWidth);
                
                switch (clickedPartMenu) {
                    case LandParts.LEFT:
                        if (this.menuSelect !== LandParts.LEFT) {
                            this.menuSelect = LandParts.LEFT;
                            
                        }
                        break;
                    case LandParts.CENTER:
                        if (this.menuSelect !== LandParts.CENTER) {
                            this.menuSelect = LandParts.CENTER;
                            
                        }
                        break;
                    case LandParts.RIGHT:
                        if (this.menuSelect !== LandParts.RIGHT) {
                            this.menuSelect = LandParts.RIGHT;
                        
                        }
                        break;
                    default:
                        // Default case
                        break;
                }
                if(this.game.mouseClick){
                    //console.log(this.plants[clickedPart].state);
                    console.log(this.previousLandPartsClick);
                    switch (clickedPartMenu) {
                        case PLANTNAMES.CORN:
                            this.plants[this.previousLandPartsClick] = new CornPlant(this.game,this.x + (92/3)*this.previousLandPartsClick,this.y, PARAMS.DAYCOUNTER)
                            break;
                        case PLANTNAMES.STRAWBERRY:
                            this.plants[this.previousLandPartsClick] = new StrawberryPlant(this.game,this.x + (92/3)*this.previousLandPartsClick,this.y, PARAMS.DAYCOUNTER)
                            break; 
                        case PLANTNAMES.RICE:
                            this.plants[this.previousLandPartsClick] = new RicePlant(this.game,this.x + (92/3)*this.previousLandPartsClick,this.y, PARAMS.DAYCOUNTER)
                            
                            break;  
                        default:
                          // Default case
                        break;    
                    }
                    this.menuPlantShow = false;
                    this.menuSelect = null;
                }



            }

            //User click out of the zone will close the plant menu
            if(this.menuPlantShow && !(this.game.mouse.x > this.x - this.game.camera.x 
                && this.game.mouse.x < this.x + 96 - this.game.camera.x 
                && this.game.mouse.y > this.y - this.game.camera.y -  this.menuOffsetY
                &&  this.game.mouse.y  < this.y + 27 - this.game.camera.y -  this.menuOffsetY )
                && !(this.game.mouse.x > this.x - this.game.camera.x 
                && this.game.mouse.x < this.x + 92 - this.game.camera.x 
                && this.game.mouse.y > this.y - this.game.camera.y
                &&  this.game.mouse.y  < this.y + 27 - this.game.camera.y)
                ){
                    if(this.game.mouseClick){
                        this.menuPlantShow = false;
                        this.menuSelect = null;
                    }

            }
        
        } 

    };
    draw(ctx) {
        
        this.game.ctx.strokeStyle = "white ";
        this.game.ctx.lineWidth = 2;
        ctx.drawImage(this.spritesheet,0,197, 92,27, this.x - this.game.camera.x,this.y - this.game.camera.y,92,27);
        if(this.selectedLand != null){
            this.game.fillStyle = "green";
            this.game.ctx.strokeRect(this.x - this.game.camera.x + (92/3)*this.selectedLand,this.y - this.game.camera.y,92/3,27);
        }
        if(this.plants.length > 0){
            this.plants.forEach((thePlant)=>{
                if(thePlant != null)
                thePlant.draw(ctx);
            })
        }
        
        if(this.menuPlantShow){
            ctx.drawImage(this.spritesheet,227,0, 96,32, this.x - this.game.camera.x,this.y - this.game.camera.y -  this.menuOffsetY,96,32);
        }
        

        if(this.menuSelect != null){
            this.game.ctx.strokeRect(this.x - this.game.camera.x + (96/3)*this.menuSelect,this.y - this.game.camera.y - this.menuOffsetY,92/3,32);
        }
        
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x + this.width/2, this.y - this.game.camera.y + this.height/2 , this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

    }

}
