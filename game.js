// Game state

const gameScreen = document.getElementById('game');

const rowCount = 6;
const columnCount = 10;

const row0 = ['air','air','air','air','air','air','air','air','air','air'];
const row1 = ['air','air','air','air','air','air','air','air','air','air'];
const row2 = ['grass','grass','air','air','air','grass','grass','grass','grass','grass'];
const row3 = ['grass','grass','air','air','grass','grass','grass','grass','grass','grass'];
const row4 = ['grass','grass','air','grass','grass','grass','grass','grass','grass','grass'];
const row5 = ['grass','grass','grass','grass','grass','grass','grass','grass','grass','grass'];

const world = [row0,row1,row2,row3,row4,row5];

// Player state
let playerRow = 1;
let playerColumn = 5;
let airMovesRemaining = 1;


function renderWorld()
{
    gameScreen.replaceChildren();
    world.forEach((row,rowIndex)=>
        {
        for(let columnIndex = 0; columnIndex < columnCount; columnIndex++)
        {
            const cell = document.createElement('div');
            cell.className = 'block';
            gameScreen.appendChild(cell);
            if(row[columnIndex] == 'air')
            {
            cell.classList.add('air');  
            }
            else
            {
                cell.classList.add('grass');
            }
            
            if(rowIndex == playerRow && columnIndex == playerColumn)
            {
                const player = document.createElement('div');
                player.className = 'player';
                cell.appendChild(player);
            }
        }
            
        }
    );    
}

renderWorld();



function gravity()
{
    if(playerRow < rowCount - 1) // if player is above the last block in the world
    {
        if(isJumping == true)
        {  
            return;   
        }
        else if(world[playerRow+1][playerColumn] == 'air')
        {
            playerRow++;
            renderWorld();
            //setTimeout(gravity,500);
        }

    }
    
}

setInterval(gravity, 100);

let isJumping = false;

document.addEventListener('keydown',function(event)
    {
        if(event.key == 'ArrowRight')
        {
            if(playerColumn < columnCount - 1) //keeps player in world
            {
                if(world[playerRow][playerColumn+1] != 'grass')
                {   
                    if(isJumping)
                    {
                        if(airMovesRemaining > 0)
                        {
                            airMovesRemaining--;
                            playerColumn++;
                            renderWorld();
                        }
                        else if(airMovesRemaining <= 0)
                        {
                        return;
                        }
                        
                    } 
                    else
                    {
                        playerColumn++;                    
                        renderWorld();    
                    } 
                    
                    
                    
                    
                    
                    //setTimeout(gravity,800); 
                }
                
                
                //Auto-move up mechanic
                /*
                else if(world[playerRow][playerColumn+1] == 'grass' && world[playerRow-1][playerColumn] =='air' && world[playerRow-1][playerColumn+1] == 'air') 
                {
                    playerRow--;
                    setTimeout(renderWorld,3000);
                    playerColumn++;
                    renderWorld();
                    //setTimeout(gravity,500);                       
                }
                    */
            }
            
        }

        if(event.key == 'ArrowLeft')
        {
            if(playerColumn > 0)
            {
                if(world[playerRow][playerColumn-1] != 'grass')
                {
                    if(isJumping)
                    {
                        if(airMovesRemaining > 0)
                        {
                            airMovesRemaining--;
                            playerColumn--;
                            renderWorld();
                        }
                        else if(airMovesRemaining <= 0)
                        {
                        return;
                        }
                        
                    } 
                    else
                    {
                        playerColumn--;                    
                        renderWorld();    
                    }     
                }

                
                //Auto-move up mechanic
                /*
                else if(world[playerRow][playerColumn-1] == 'grass' && world[playerRow-1][playerColumn] =='air' && world[playerRow-1][playerColumn-1] == 'air') 
                {
                    playerRow--;
                    setTimeout(renderWorld,3000);
                    playerColumn--;
                    renderWorld();
                    //setTimeout(gravity,500);                       
                }
                */
            }
            
        }
        
        if(event.key == 'ArrowUp')
        {

            if(playerRow > 0)
            {
                if(world[playerRow-1][playerColumn] != 'grass' && world[playerRow+1][playerColumn] == 'grass')
                {
                    playerRow--;
                    renderWorld();
                    isJumping = true;
                    airMovesRemaining = 1;
                    //setTimeout(gravity,1500);  
                    
                    setTimeout(function ()
                    {
                        isJumping = false;
                    }, 500);
                }
      
            }
        }

        if(event.key == 'ArrowDown')
        {
            if(playerRow < rowCount - 1)
            {
               if( world[playerRow+1][playerColumn] != 'grass')
                {
                    playerRow++;
                    renderWorld();
                    //setTimeout(gravity,500);     
                    
                    
                } 
            }
                
        }




        console.log(event.key);
    }
);