import { Block, Direction } from "./BlockNode";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node)

    blockGrid: cc.Node = null;
    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null;
    @property(cc.SpriteFrame)
    straight: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    winding: cc.SpriteFrame = null;
    @property
    length: number = 50;//边长

    start() {
        this.restart();
    }

    restart() {
        var blockList: Array<Block> = [new Block, new Block, new Block, new Block, new Block, new Block];
        var block = blockList[0];
        block.direct = Direction.East;
        block.x = 2;
        block.y = 0;
        block.nextNode = blockList[1];

        block = blockList[1];
        block.direct = Direction.East;
        block.x = 1;
        block.y = 0;
        block.nextNode = blockList[2];

        block = blockList[2];
        block.direct = Direction.South;
        block.switchDirect = Direction.North;
        block.x = 0;
        block.y = 0;
        block.nextNode = blockList[3];
        block.switchNode = blockList[4];

        block = blockList[3];
        block.direct = Direction.North;
        block.x = 0;
        block.y = 1;
        block.nextNode = blockList[5];

        block = blockList[4];
        block.direct = Direction.South;
        block.x = 0;
        block.y = -1;
        block.isFinal = true;

        block = blockList[5];
        block.direct = Direction.North;
        block.x = 0;
        block.y = 2;
        block.isFinal = true;

        this.generateMap(blockList);
    }
    generateMap(nodeList: Array<Block>) {
        //生成node以及其属性
        for (let index = 0; index < nodeList.length; index++) {
            const block = nodeList[index];
            block.node = cc.instantiate(this.blockPrefab);
            if (block.direct % 2 == 0) {
                block.node.getComponent(cc.Sprite).spriteFrame = this.straight;

            } else {
                block.node.getComponent(cc.Sprite).spriteFrame = this.winding;
            }
            block.node.rotation = Math.floor(block.direct / 2) * 90;
            this.blockGrid.addChild(block.node);
            block.node.width = block.node.height = this.length;
            block.node.x = this.length * block.x;
            block.node.y = this.length * block.y;
            //switch节点绑定事件
            if (block.switchNode) {
                block.node.on(cc.Node.EventType.TOUCH_END, () => {
                    this.switchBlock(block);
                })
            }
        }
    }
    switchBlock(block: Block) {
        var temp: any = block.nextNode;
        block.nextNode = block.switchNode;
        block.switchNode = temp;

        temp = block.switchDirect;
        block.switchDirect = block.direct;
        block.direct = temp;
        if (block.direct % 2 != block.switchDirect % 2) {
            if (block.direct % 2 == 0) {
                block.node.getComponent(cc.Sprite).spriteFrame = this.straight;
            } else {
                block.node.getComponent(cc.Sprite).spriteFrame = this.winding;
            }
        }
        block.node.rotation = Math.floor(block.direct / 2) * 90;
    }
}
