import {Block, Direction}  from "./BlockNode";
export default class BlockManager{
    
    private static nodeArray:string[][];

    private static head:Block;

    public static blockList:Array<Block>;

    public static genLinkBlockList(nodeArray:string[][]):Block{
        this.nodeArray=nodeArray;
        var start=this.findStartNode();
        var isVisit= new Array();
        for(var i=0;i<this.nodeArray.length;i++){
            var arr=new Array();
            for(var j=0;j<this.nodeArray[0].length;j++){
                arr.push(false);
            }
            isVisit.push(arr);
        }
        this.head=new Block(null,null,false,0,0);
        this.blockList=new Array<Block>();
        this.genLinkBlock(this.head,start[0],start[1],this.nodeArray,isVisit);
        this.head=this.head.nextBlock;
        return this.head;
    }

    public static genLinkBlock(head:Block,startX:number,startY:number,nodes:string[][],isVisit:boolean[][]){
        if(startX<0||startY<0||startX>nodes.length-1||startY>nodes[0].length-1){
            return;
        }
        isVisit[startX][startY]=true;
        var node=null;
        var n=nodes[startX][startY];
        var pointXY=this.culPointXY(startX,startY);
        if(n.indexOf("S")==0){
            var s1=n.substr(n.indexOf("(")+1,2);
            var s2=n.substr(n.indexOf(",")+1,2);
            node=new Block(this.findDirection(s1),this.findDirection(s2),false,pointXY[0],pointXY[1]);
        }else if(n=="AB"||n=="AR"||n=="AG"){
            node=new Block(this.findDirection(n),null,true,pointXY[0],pointXY[1]);
        }else{
            node=new Block(this.findDirection(n),null,false,pointXY[0],pointXY[1]);
        }
        if(head.direct==null || head.direct==node.direct || node.isFinal){
            head.nextBlock=node;
        }else{
            head.switchBlock=node;
        }
        this.blockList.push(node);
            if (startY + 1 < nodes[0].length && "0"!=nodes[startX][startY + 1] && !isVisit[startX][startY+1])
            {
                this.genLinkBlock(node,startX, startY + 1,  nodes, isVisit);
            }
            if (startY - 1 >=0 && "0"!=nodes[startX][startY - 1] && !isVisit[startX][startY -1])
            {
                this.genLinkBlock(node,startX, startY - 1,  nodes, isVisit);
            }
            if (startX - 1 >= 0 && "0"!=nodes[startX-1][startY] && !isVisit[startX-1][startY])
            {
                this.genLinkBlock(node,startX-1, startY,  nodes, isVisit);
            }
            if (startX + 1 < nodes.length && "0"!=nodes[startX+1][startY] && !isVisit[startX+1][startY])
            {
                this.genLinkBlock(node,startX+1, startY, nodes, isVisit);
            }



    }
    private static findDirection(key:string):Direction{
        switch (key){
            case "NS":return Direction.South;break;
            case "WE":return Direction.East;break;
            case "SN":return Direction.North;break;
            case "EW":return Direction.West;break;
            case "NE":return Direction.NorthEast;break;
            case "NW":return Direction.NorthWest;break;
            case "SE":return Direction.SouthEast;break;
            case "SW":return Direction.SouthWest;break;
            default:
            return null;
        }
    }

    private static culPointXY(startX:number,startY:number){
        
        return [startY,startX]
    }

    private static findStartNode():[number,number]{

        for(var i=0;i<this.nodeArray.length;i++){
            for(var j=0;j<this.nodeArray[0].length;j++){
                if(this.nodeArray[i][j]=="D"){
                    return [i,j];
                }
            }
        }
    }


}
