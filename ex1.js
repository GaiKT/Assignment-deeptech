class Function {
    constructor( a , b , c , d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.addVal = [];
        this.multiplyVal = [];
    }

    simplify([num1 , num2]){
        const gcd = gdc(num1 , num2);

        const result = [ (num1 / gcd) , (num2 / gcd)];

        return `${result[0]}/${result[1]}`
    }

    add(){
        // a/b + c/d = (a + b) / b or (a*d) + (c*b) / (b*d)
        if(this.b === this.d){
            this.addVal = [this.a + this.c , this.b]
        }else{
            this.addVal = [(this.a * this.d) + (this.c*this.b) , this.b * this.d]
        }
        console.log("Add value is : " + this.simplify(this.addVal))
    }

    multiply(){
        // a/b * c/d = (a*c) / (b*d)
        this.multiplyVal = [this.a * this.c  , this.b * this.d]
        console.log("Multiply value is : " + this.simplify(this.multiplyVal))
    }

    show(){
        this.add()
        this.multiply()
    }
}

// Function to find the GCD of two numbers
const gdc = (a, b) => {
    if (!b) return a;
    return gdc(b, a % b);
};

//Example case
const result1 = new Function(1,7,3,7)
result1.show()

const result2 = new Function(1,2,1,3)
result2.show()

const result3 = new Function(1,7,3,7)
result3.show()

const result4 = new Function(1,8,3,8)
result4.show()

const result5 = new Function(2,3,1,2)
result5.show()


