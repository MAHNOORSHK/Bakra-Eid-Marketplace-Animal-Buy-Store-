#! /usr/bin/env node
import inquirer from "inquirer";

interface Animal{
    name: string;
    price: number;
}

interface CartItem {
    animal : Animal;
    quantity : number;
}

const animals: Animal[] = [
    { name: 'Cow', price: 300000 },
    { name: 'Goat', price: 80000 },
    { name: 'Sheep', price: 50000 },
    { name: 'Camel', price: 90000 },
    {name : 'Bull', price: 200000},
    {name : 'Buffalo', price: 20000},
];
  
let cart : CartItem[] = [];

while(true){
const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Welcome to the Animal Buy Store! What would you like to do?',
        choices: ['Buy an animal', 'View cart', 'Checkout', 'Exit'],
      },
]);

if(answers.action == "Buy an animal"){
    let animalBuy = await inquirer.prompt([
        {
            type: "list",
            name: "animal",
            message : "which animal would you like to buy?",
            choices : ["Cow", "Goat", "Sheep", "Camel", "Bull", "Buffalo"]
        }
    ]);

    let quantityAnswer = await inquirer.prompt([
        {
            type: "list",
            name: "quantity", 
            message: "How many would you like to buy?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    ]);

let selectedAnimal : Animal = animalBuy.animal;
const quantity = quantityAnswer.quantity;
// console.log(selectedAnimal);
// console.log(quantity);

if (animalBuy.animal === 'Cow') {
    selectedAnimal = animals[0];
  } else if (animalBuy.animal === 'Goat') {
    selectedAnimal = animals[1];
  } else if (animalBuy.animal === 'Sheep') {
    selectedAnimal = animals[2];
  } else if (animalBuy.animal === 'Camel') {
    selectedAnimal = animals[3];
  }  else if (animalBuy.animal === 'Bull') {
    selectedAnimal = animals[4];
  }  else if (animalBuy.animal === 'Buffalo') {
    selectedAnimal = animals[5];
  }

  if (selectedAnimal) {
    let foundInCart = false;
    for (const item of cart) {
      if (item.animal.name === selectedAnimal.name) {
        item.quantity += quantity;
        foundInCart = true;
        break;
      }
    }

    if (!foundInCart) {
      cart.push({ animal: selectedAnimal, quantity });
    }

    console.log(`Added ${quantity} ${selectedAnimal.name}(s) to your cart.`);
   
  } 
}
 else if (answers.action === "View cart") { 
    if (cart.length === 0) {
    console.log('Your cart is empty.');
  } else {
    console.log('Your cart contains:');
    for (const item of cart) {
      console.log(`${item.quantity} x ${item.animal.name} - $${item.animal.price * item.quantity}`);
    }
  }
} else if (answers.action === 'Checkout') {
  if (cart.length === 0) {
    console.log('Your cart is empty.');
  } else {
    const total = cart.reduce((sum, item) => sum + item.animal.price * item.quantity, 0);
    console.log(`Your total is $${total}.`);
    cart = [];
    console.log('Thank you for your purchase!');
  }
} else if (answers.action === 'Exit') {
  console.log('Thank you for visiting the Animal Buy Store!');
  break;
}
}

