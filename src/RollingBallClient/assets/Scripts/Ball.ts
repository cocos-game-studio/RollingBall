import { Block } from "./BlockNode";

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
export default class Ball extends cc.Component {

    @property(cc.Color)
    color: cc.Color = null;
    @property
    speed: number = 2;//走一格的时间

    private currentBlock: Block;
    private anim: cc.AnimationState;
    private destroyCallback: Function;

    init(block: Block, destroyCallback: Function) {
        this.currentBlock = block;
        this.destroyCallback = destroyCallback;
    }
    update(dt) {
        var v2: cc.Vec2 = this.node.position.sub(this.currentBlock.nextBlock.node.position);
        if (v2.mag() > 1) {
            v2 = this.node.position.lerp(this.currentBlock.nextBlock.node.position, this.speed);
        } else if (!this.currentBlock.isFinal) {
            this.currentBlock = this.currentBlock.nextBlock;
        } else {
            this.destroy();
        }
    }
    onDestroy() {
        this.destroyCallback(this);
    }
}
