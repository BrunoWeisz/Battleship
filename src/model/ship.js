class Ship{
    constructor(length, position, orientation = "vertical"){
        
        this.typeCheckLength(length);
        this.typeCheckPosition(position);
        
        this.hitSquares = [];
        this.squares = [];
        this.length = length;
        this.orientation = orientation;

        if (orientation === 'vertical'){
            for (let i = 0; i < this.length; i++){
                this.squares.push([position[0]+i, position[1]]);
            }
        } else if (orientation === 'horizontal'){
            for (let i = 0; i < this.length; i++){
                this.squares.push([position[0], position[1]+i]);
            }
        } else {
            throw new Error("Orientation must be valid");
        }

        this.checkBounds();
    }

    // ---- actions ---- //

    toBeAttackedAt(aPosition){
        this.hitSquares.push(aPosition);
    }

    hitAt(aPosition){
        return this.hitSquares.some(pos => {
            return pos[0] == aPosition[0] && pos[1] == aPosition[1];
        })
    }

    // ---- testing ---- //
    isSink(){
        return this.squares.length == this.hitSquares.length;
    }


    //--------Bound Check------------------------------------//
    checkBounds(){
        this.squares.forEach(square => {
            if(!(square[0] >= 0 && square[0] < 10 && 
                square[1] >= 0 && square[1] < 10)){
               throw new Error('Ship position must be between bounds');
            }
        })
    }
    //----------------Superposition checks-------------------//
    superposesWith(anotherShip){
        return anotherShip.getSquares().some(aSquare => {
            return this.hasPosition(aSquare); 
        })
    }

    touchesWith(anotherShip){
        return anotherShip.getSquares().some(aSquare => {
            return this.getSquares().some(anotherSquare => {
                return this.squaresAreAdyacent(aSquare, anotherSquare);
            }) 
        })
    }

    squaresAreAdyacent(aSquare, anotherSquare){
        return (Math.abs(aSquare[0] - anotherSquare[0]) <= 1) &&
               (Math.abs(aSquare[1] - anotherSquare[1]) <= 1);
    }

    hasPosition(aSquare){
        return this.getSquares().some(anotherSquare => {
            return (aSquare[0] == anotherSquare[0] &&
                    aSquare[1] == anotherSquare[1]);
        }) 
    }

    getSquares(){
        return this.squares;
    }

    size(){
        return this.length;
    }

    //--------Type Checks------------------------------------//
    typeCheckLength(length){
        if(!Number.isInteger(length)) {throw new Error("Ship length must be integer")}
        if(length > 4){throw new Error("Ship length must be 4 or less")}
    }
    typeCheckPosition(position){
        if(!(Array.isArray(position) && position.length == 2)){
            throw new Error('Ship position must be a length 2 array');
        }
        if(!(Number.isInteger(position[0]) && Number.isInteger(position[1]))){
            throw new Error('Ship position must be integer');
        }   
    }
    //----------------------- private --------------------------//

}

export default Ship;