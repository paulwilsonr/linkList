let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 2];
class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.sortedArr = sortArr(arr);
        this.root = buildTree(this.sortedArr);
    }
    insert(value, currentNode = this.root) {
        if (currentNode == null) {
            currentNode = new Node(value);
            return currentNode;
        }
        if (value > currentNode.data) {
            currentNode.right = this.insert(value, currentNode.right);
        } else if (value < currentNode.data) {
            currentNode.left = this.insert(value, currentNode.left);
        }
        return currentNode;
    }
    delete(value, currentNode = this.root) {
        if (currentNode == null) {
            return currentNode;
        } else if (value < currentNode.data) {
            currentNode.left = this.delete(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode.right = this.delete(value, currentNode.right);
        } else {
            if (currentNode.left == null) {
                return currentNode.right;
            } else if (currentNode.right == null) {
                return currentNode.left;
            }
            currentNode.data = this.minValue(currentNode.right)
            currentNode.right = this.delete(currentNode.data, currentNode.right)




        }
        return currentNode;
    }

    minValue(currentNode) {
        let minVal = currentNode.data;
        while (currentNode.left != null) {

            minVal = currentNode.left.data;
            currentNode = currentNode.left;
        }
        return minVal;
    }

    find(value, currentNode = this.root) {
        if (value == currentNode.data) {
            return currentNode;
        } if (currentNode.left === null && currentNode.right === null) {
            return `${value} is not in tree`;
        }
        if (value < currentNode.data) {
            return this.find(value, currentNode.left);
        } else {
            return this.find(value, currentNode.right);
        }
    }
    levelOrder(callback = null) {
        let currentNode = this.root;
        if(currentNode == null){
            console.log('Error: no tree root')
            return;
        };
        let queue = [currentNode];
        let returnedArr = [];
        while(queue.length != 0) {
            if (queue[0].left != null) {
                queue.push(queue[0].left)
            }
            if(queue[0].right != null) {
                queue.push(queue[0].right)
            }
            if(callback == null) {
                returnedArr.push(queue.shift().data)
            } else {
                callback(queue.shift().data);
            }
            
            
        }

        return returnedArr;
    }
    inorder(callback = null, currentNode = this.root){
        let arr = []
        if(currentNode == null) {
            return
        }
        if (callback === null) {
            
            callback = function (node) {
                arr.push(node.data);
            }
        } 
        this.inorder(callback, currentNode.left);
        callback(currentNode);
        this.inorder(callback, currentNode.right);
        if(arr.length > 0) {
            return arr;
        }
    }
    preorder(callback = null, currentNode = this.root){
        let arr = []
        if(currentNode == null) {
            return
        }
        if (callback == null) {
            
            callback = function (node) {
                arr.push(node.data);
            }
        } 
        callback(currentNode);
        this.preorder(callback, currentNode.left);
        this.preorder(callback, currentNode.right);
        if(arr.length > 0) {
            return arr;
        }
    }
    postorder(callback = null, currentNode = this.root){
        let arr = []
        if(currentNode == null) {
            return
        }
        if (callback == null) {
            
            callback = function (node) {
                arr.push(node.data);
            }
        } 
        this.postorder(callback, currentNode.left);
        this.postorder(callback, currentNode.right);
        callback(currentNode);
        if(arr.length > 0) {
            return arr;
        }
    }
    height(node){
        //let mainNode = this.find(value);
        return this.findDepth(node);
    }
    depth(value) {
        let mainNode = this.find(value);
        return (this.findDepth(this.root) - (this.findDepth(mainNode) - 1));
    }
    findDepth(mainNode) {
        if (mainNode == null) {
            return 0;
        } else {
            let leftDepth = this.findDepth(mainNode.left);
            let rightDepth = this.findDepth(mainNode.right);
            if(leftDepth > rightDepth){
                return (leftDepth +1)
            } else {
                return (rightDepth +1)
            }
        }
    }
    isBalanced(currentNode = this.root){
        if(currentNode == null) {
            return true;
        };
        let leftHeight = this.height(currentNode.left);
        let rightHeight = this.height(currentNode.right);

        if (Math.abs(leftHeight - rightHeight) <= 1 &&this.isBalanced(currentNode.left) == true && this.isBalanced(currentNode.right) == true) {
            return true;
        }

        return false;
    }
    rebalance(){
        let balanceArr = this.inorder();
        this.root = buildTree(balanceArr);
    }
}

function buildTree(arr, start = 0, end = arr.length - 1) {

    if (start > end) {
        return null;
    }
    let half = parseInt((start + end) / 2);
    let root = new Node(arr[half])
    root.left = buildTree(arr, start, half - 1);
    root.right = buildTree(arr, half + 1, end);
    return root;
}


function merge(leftArr, rightArr) {
    let arr = [];
    while (leftArr.length && rightArr.length) {
        if (leftArr[0] === rightArr[0]) {
            arr.push(leftArr.shift())
            rightArr.shift();
        }
        if (leftArr[0] < rightArr[0]) {
            arr.push(leftArr.shift());
        } else {
            arr.push(rightArr.shift());
        }
    }
    return [...arr, ...leftArr, ...rightArr];
}

function sortArr(arr) {
    const half = arr.length / 2;

    if (half < 1) {
        return arr;
    }

    const left = arr.splice(0, half);
    return merge(sortArr(left), sortArr(arr));
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
let testTree = new Tree(testArr);
testTree.insert(45);
testTree.insert(100)
testTree.insert(102)
testTree.insert(103)
testTree.insert(104)
prettyPrint(testTree.root)

console.log(testTree.isBalanced())
testTree.rebalance();
prettyPrint(testTree.root)
console.log(testTree.isBalanced())
