class Ship{
    constructor(length, position, orientation){
        
        this.typeCheckLength(length);
        this.typeCheckPosition(position);
        
        this.squares = [];


        if (orientation == 'vertical'){
            if (length == 1){
                this.squares.push(position);
            } else if (length == 2){
                this.squares.push(position);
                this.squares.push([position[0]+1, position[1]]);
            }
        } else if (orientation == 'horizontal'){
            if (length == 1){
                this.squares.push(position);
            } else if (length == 2){
                this.squares.push(position);
                this.squares.push([position[0], position[1]]+1);
            }
        }
    }

    //--------Type Checks------------------------------------//
    typeCheckLength(length){
        if(!_.isInteger(length)) {throw new Error("Ship length must be integer")}
    }
    typeCheckPosition(position){
        if(!(_.isArray(position) && position.length == 2)){
            throw new Error('Ship position must be a length 2 array');
        }
        if(!(_.isInteger(position[0]) && _.isInteger(position[1]))){
            throw new Error('Ship position must be integer');
        }
        
    }
    //-------------------------------------------------------//

}

export default Ship;