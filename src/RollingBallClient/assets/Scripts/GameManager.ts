import { Block, Direction } from "./BlockNode";
import Ball from "./Ball";
import BlockGenerator from "./BlockGenerator";

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
    @property(cc.Node)
    ballPool: cc.Node = null;
    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    ballPrefab: cc.Prefab = null;

    @property(cc.SpriteFrame)
    startPoint: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    straight: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    winding: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    destinationBlue: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    destinationRed: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    destinationGreen: cc.SpriteFrame = null;

    @property
    length: number = 50;//边长
    @property
    speed: number = 25;//边长

    start() {
        this.restart();
    }

    restart() {
        /*var blockList: Array<Block> = [new Block, new Block, new Block, new Block, new Block, new Block];
        var block = blockList[0];
        block.direct = Direction.West;
        block.x = 2;
        block.y = 0;
        block.nextBlock = blockList[1];

        block = blockList[1];
        block.direct = Direction.West;
        block.x = 1;
        block.y = 0;
        block.nextBlock = blockList[2];

        block = blockList[2];
        block.direct = Direction.NorthEast;//180
        block.switchDirect = Direction.SouthEast;//90
        block.x = 0;
        block.y = 0;
        block.nextBlock = blockList[3];
        block.switchBlock = blockList[4];

        block = blockList[3];
        block.direct = Direction.North;
        block.x = 0;
        block.y = 1;
        block.nextBlock = blockList[5];

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
        */

        var start:Block = BlockGenerator.generateBlock();
        this.generateMap(BlockGenerator.getFullNodeList());
        this.ballSchedule(start);
    }
    generateMap(nodeList: Array<Block>) {
        //生成node以及其属性
        for (let index = 0; index < nodeList.length; index++) {
            const block = nodeList[index];
            block.node = cc.instantiate(this.blockPrefab);
            var sprite: cc.Sprite = block.node.getComponent(cc.Sprite);
            if (block.direct % 2 == 0) {
                sprite.spriteFrame = this.straight;

            } else {
                sprite.spriteFrame = this.winding;
            }
            sprite.trim = false;
            block.node.rotation = Math.floor(block.direct / 2) * 90;//旋转block
            this.blockGrid.addChild(block.node);
            block.node.width = block.node.height = this.length;
            block.node.x = this.length * block.x;
            block.node.y = this.length * block.y;
            //switch节点绑定事件
            if (block.switchBlock) {
                block.node.on(cc.Node.EventType.TOUCH_END, () => {
                    this.switchBlock(block);
                })
            }
        }
    }
    switchBlock(block: Block) {
        var temp: any = block.nextBlock;
        block.nextBlock = block.switchBlock;
        block.switchBlock = temp;

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
    ballSchedule(first: Block) {
        this.scheduleOnce(() => {
            var node: cc.Node = cc.instantiate(this.ballPrefab);
            node.position = first.node.position;
            node.getComponent(Ball).init(first, this.length, this.speed, ballPool.put);
            this.ballPool.addChild(node);
            node.width = 40;
            node.height = 40;
            ballPool.pool.push(node);
        }, 5);
    }
}

var ballPool = function () {
    var pool: cc.Node[] = [];
    return {
        get: function () {

        },
        put: function () {

        },
        pool
    }
}()