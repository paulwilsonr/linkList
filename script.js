class LinkedList {
    constructor(head = null) {
        this.head = head;
    }
    append(value) {
        if (!this.head) {
            this.head = new Node(value);
        } else {
            this.tail().nextNode = new Node(value);
        }
    }
    prepend(value) {
        let oldHead = new Node(this.head.value, this.head.nextNode);
        this.head = new Node(value, oldHead);
    }
    size(currentNode = this.head) {
        if (!currentNode.nextNode) {
            return 1;
        }
        return 1 + this.size(currentNode.nextNode);
    }
    head() {
        return this.head.value;
    }
    tail(currentNode = this.head) {
        if (!currentNode.nextNode) {
            return currentNode;
        }

        return this.tail(currentNode.nextNode)
    }
    at(index, currentNode = this.head) {
        if (index > this.size()) {
            return 'Error: Index must be a number equal to or less than ' + this.size();
        }
        if (index === 1) {
            return currentNode;
        }
        return this.at(index - 1, currentNode.nextNode);
    }
    pop() {
        let newTail = this.at(this.size() - 1);
        newTail.nextNode = null;
    }
    contains(value, currentNode = this.head) {
        if (currentNode.value == value) {
            return true;
        } else if (!currentNode.nextNode) {
            return false;
        }
        return this.contains(value, currentNode.nextNode);
    }
    find(value, currentNode = this.head, index = 1) {
        if (!this.contains(value)) {
            return null;
        } if (currentNode.value == value) {
            return index;
        }
        return this.find(value, currentNode.nextNode, index + 1);
    }
    toString(currentNode = this.head) {
        if (!currentNode.nextNode) {
            return currentNode.value;
        }
        return `${currentNode.value} -> ${this.toString(currentNode.nextNode)}`;
    }
    insertAt(value, index) {
        if (index > this.size() || index < 1) {
            console.log('Error: Index must be a number between 1 and ' + this.size())
            return;
        }
        let oldNodeBegin = this.at(index - 1);
        let oldNodeEnd = this.at(index);
        oldNodeBegin.nextNode = new Node(value, oldNodeEnd);
    }
    removeAt(index) {
        if (index > this.size() || index < 1) {
            console.log('Error: Index must be a number between 1 and ' + this.size())
            return;
        } if (index == 1) {
            this.head = this.at(2);
        } if (index == this.size()) {
            this.pop();
        } else {
        let oldNodeBegin = this.at(index - 1);
        let oldNodeEnd = this.at(index+1);
        oldNodeBegin.nextNode = oldNodeEnd;
        }
    }

};

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }

};


const testList = new LinkedList();
testList.append(10)
testList.append(44)
testList.append(66)
testList.prepend('first')
testList.insertAt('three', 3)

console.log(testList);
console.log(testList.toString())

testList.removeAt(5);
console.log(testList.toString())


