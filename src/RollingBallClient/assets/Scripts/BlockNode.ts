class Block {
    node: cc.Node;
    nextNode: Block;
    switchNode: Block;
    direct: Direction;
    switchDirect?: Direction;
    isFinal: boolean;
    x: number;
    y: number;
}
//直走向以West为基准角度，曲走向以SouthEast为基准角度
enum Direction {
    West,
    SouthWest,
    South,
    SouthEast,
    East,
    NorthEast,
    North,
    NorthWest,
}
export {
    Block,
    Direction
}