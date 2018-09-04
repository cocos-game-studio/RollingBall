import { Block, Direction } from "./BlockNode";

export default new class BlockGenerator extends cc.Component {
    private gameMap:string[][] = [
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","D","","","","","",""],
        ["","","2","","","","","",""],
        ["","","2","","","","","",""],
        ["","","2","","","","","",""],
        ["","","S21","0","0","0","AR","",""],
        ["","","2","","","","","",""],
        ["","","2","","","","","",""],
        ["","","2","","","","","",""],
        ["","","S21","0","0","0","AB","",""],
        ["","","2","","","","","",""],
        ["","","2","","","","","",""],
        ["","","AG","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
    ];

    private storedNode = [];
    public generateBlock(){
        // find departure first
        var departure:Block = null;
        for(var i =0; i< this.gameMap.length;i++){
            for(var j = 0;j<this.gameMap[i].length;j++){
                var s = this.gameMap[i][j];
                if(s == "D"){
                    departure = new Block;
                    departure.nextBlock = null;
                    departure.switchBlock = null;
                    departure.direct = 0;
                    departure.switchDirect = 0;
                    departure.isFinal = false;
                    departure.x = j;
                    departure.y = i;
                    this.storedNode.push(departure);
                    this.findNextNode(departure);
                    break;
                }
            }
        }

        return departure;
    }

    public getFullNodeList(){
        return this.storedNode;
    }

    private isStoredNode(node){
        for(var i=0;i<this.storedNode.length;i++){
            if(this.storedNode[i].x == node.x && this.storedNode[i].y == node.y){
                return true;
            }
        }
        return false;
    }

    private findNextNode(node){
        var maxWidth = this.gameMap[0].length;
        var maxHeight = this.gameMap.length;
        var nextNode = null;

        // search from 4 direction
        var temp = null;

        // up
        if(node.y - 1 >= 0){
            temp = {
                x:node.x,
                y:node.y - 1,
                direction:"up"
            }
            
            nextNode = this.checkNode(node,temp);
        }
        // right
        if(node.x + 1 <= maxWidth){
            temp = {
                x:node.x + 1,
                y:node.y,
                direction:"right"
            }

            nextNode = this.checkNode(node,temp);
        }
        // down
        if(node.y + 1 <= maxHeight){
            temp = {
                x:node.x,
                y:node.y + 1,
                direction:"down"
            }
            nextNode = this.checkNode(node,temp);
        }
        // left
        if(node.x - 1 >= 0){
            temp = {
                x:node.x - 1,
                y:node.y,
                direction: "left"
            }
            nextNode = this.checkNode(node,temp);
        }

        if(nextNode == null){
            // current node is terminal
            node.isFinal = true;
        }
    }

    private checkNode(node, temp) {
        var block:Block = null;
        temp.text = this.gameMap[temp.y][temp.x];
        if (temp.text != "" && this.isStoredNode(temp) == false) {
            block = new Block;
            block.nextBlock = null;
            block.switchBlock = null;
            if(temp.text.indexOf("S") != -1){
                block.direct = temp.text[1];
                block.switchDirect = temp.text[2];
            }
            else{
                block.direct = temp.text;
            }
            block.isFinal = false;
            block.x = temp.x;
            block.y = temp.y;

            if (this.gameMap[node.y][node.x].indexOf("S") != -1) { // it is switcher
                var s = this.gameMap[node.y][node.x];
                if (((s[1] == "0" || s[1]=="1" || s[1]=="7") && temp.direction == "right") ||
                    (s[1] == "2" && temp.direction == "down") ||
                    ((s[1] == "4" || s[1]=="3" || s[1]== "5") && temp.direction == "left") ||
                    (s[1] == "6" && temp.direction == "up")) {
                        node.nextBlock = block;
                }
                if (((s[2] == "0" || s[2]=="1" || s[2]=="7") && temp.direction == "right") ||
                    (s[2] == "2" && temp.direction == "down") ||
                    ((s[2] == "4" || s[2]=="3" || s[2]== "5") && temp.direction == "left") ||
                    (s[2] == "6" && temp.direction == "up")) {
                        node.switchBlock = block;
                }
            }
            else {
                node.nextBlock = block;
            }

            console.log(node);
            this.storedNode.push(block);
            this.findNextNode(block);
            return block;
        }

        return null;
    }
}