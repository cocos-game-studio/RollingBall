import BlockNode from "./BlockNode";

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

    @property(cc.SpriteFrame)
    straight: cc.Prefab = null;
    @property(cc.SpriteFrame)
    winding: cc.Prefab = null;

    start() {
        this.restart();
    }

    restart() {
        this.generateMap();
    }
    generateMap() {
        for (let index = 0; index < 5; index++) {
            const element = 5;
            var node = this.createBlock(direct, nextNode);
            if (isSwitch) {
                node.on(cc.Event.TOUCH,()=>{
                    node.switch();
                })   
            }
        }
    }
    createBlock(nextNode?: BlockNode, direct?: string, isFinal?: boolean): BlockNode {
        var node: BlockNode;
        if (straight) {
            node = <BlockNode>cc.instantiate(this.straight);
        }
        if (winding) {
            node = <BlockNode>cc.instantiate(this.winding);
        }

        node.isFinal = isFinal;
        node.nextNode = nextNode;
        return node;
    }
}
