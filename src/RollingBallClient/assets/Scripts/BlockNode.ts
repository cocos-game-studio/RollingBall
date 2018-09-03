export default class BlockNode extends cc.Node {
    nextNode: BlockNode;
    isFinal: boolean;
    private switchNode: BlockNode;
    switch() {
        var temp = this.nextNode;
        this.nextNode = this.switchNode;
        this.switchNode = temp;
    }
}
