class Block {

    constructor(direct:Direction,switchDirect:Direction,isFinal:boolean,x:number,y:number){
        this.direct=direct;
        this.isFinal=isFinal;
        this.switchDirect=switchDirect;
        this.x=x;
        this.y=y;
        this.switchBlock=null;
        this.nextBlock=null;
    }

    node: cc.Node;
    nextBlock: Block;
    switchBlock: Block;
    direct: Direction;
    switchDirect?: Direction;
    isFinal: boolean;
    x: number;
    y: number;
}
//直走向以West为基准角度，曲走向以SouthEast为基准角度
enum Direction {
    East,
    SouthEast,
    South,
    SouthWest,
    West,
    NorthWest,
    North,
    NorthEast,
}
export {
    Block,
    Direction
}