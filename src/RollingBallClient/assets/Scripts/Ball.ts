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

    private speed: number;//走一格的时间
    private length: number;//边长

    private currentBlock: Block;
    private targetBlock: Block;

    private anim: cc.AnimationState;
    private destroyCallback: Function;

    private span: number = 0;//相对于currentBlock的距离

    init(block: Block, length: number, speed: number, destroyCallback: Function) {
        this.currentBlock = block;
        this.length = length;
        this.speed = speed;
        this.destroyCallback = destroyCallback;
    }
    update(dt: number) {
        if (this.currentBlock.isFinal) {
            this.node.destroy();
        } else if (this.span < this.length) {
            if (this.span < this.length / 2) {
                this.targetBlock = this.currentBlock.nextBlock;
            }
            //到下一个节点的向量
            var v2: cc.Vec2 = this.targetBlock.node.position.sub(this.currentBlock.node.position);
            this.span += v2.mul(dt / this.length * this.speed).mag();

            var ratio = this.span / this.length;
            var span = v2.mul(ratio);
            this.node.position = this.currentBlock.node.position.clone().add(span);
        } else {
            this.currentBlock = this.targetBlock;
            this.span = 0;
        }
    }
    onDestroy() {
        this.destroyCallback(this);
    }
}
