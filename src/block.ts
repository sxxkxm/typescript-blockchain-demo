import crypto from "crypto";

interface BlockInterface {
    hash: string;
    prevHash:string;
    height:number;
    data:string;
}
class Block implements BlockInterface {
    public hash: string;
    public timestamp: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string,
    ) {
        if(!prevHash) {
            throw new Error("prevHash is required");
        }
    
        if(typeof height !== "number") {
            throw new Error("height must be a number"); 
        }
    
        if(!data) {
            throw new Error("data is required");
        }

        this.hash = Block.calculateHash(prevHash, height, data);
        this.timestamp = new Date().toISOString();
    }

    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }

    public calculateHash(){
        return Block.calculateHash(this.prevHash, this.height, this.data);
    }
}

class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevHash(){
        if(this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].calculateHash();
    }
    public addBlock(data: string){
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
}