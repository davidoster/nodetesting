class Animal {
    constructor(breed) {
        this.breed = breed;
    }
}

class Dog extends Animal {
    constructor(breed) {
        super(breed.toUpperCase());
    }
}

// console.log(Dog);
// let bulldog = new Dog("BullDog");
// console.log(bulldog);

let promise = new Promise(function(resolve, reject, otherError){
   /// connect to db, run some sql code, get the result
   // if the result is ok
    setTimeout(() => resolve("All is OK"), 1000);
    // else
    // setTimeout(() => reject("No data"), 5000);
    // otherError(new Error("Other Error"));   
});
// console.log(promise);
promise.then(
    result => { console.log(result); },
    error  => { console.log(error); }
).finally(() => console.log("finally"));

