/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  // let a = transactions
  //             .map((val)=> {return val.category})
              // .filter((curentObject, index) => {
              //   return transactions.indexOf(curentObject) == index;
              // })

  let categorySum = transactions.reduce((accumulator, curVal) => {
     const {category, price} = curVal; // object desctructing 
    // {Cloth, 30} = {
                  //   id: 1,
                //   timestamp: 1656076800000,
                    //   price: 10,
                    //   category: 'Food',
                    //   itemName: 'Pizza'
                    // }

     if(!accumulator[category]) { // {!undedined} // false //!undeide
        accumulator[category] = 0; //{Food: 0, Cloth: 0}
     } 
     // {Food: 0}
        accumulator[category] += price; // {Food: 20} // 20 + 10 {Food: 30, CLoth: 30}
        
        return accumulator;
  }, {})
  const result = Object.keys(categorySum)
                        .map(category => (
                          {  // [Food, Cloth]
                          category,
                          totalSpent: categorySum[category]
                        }
                        ))
  
  console.log(result)
  return result;
}




calculateTotalSpentByCategory([                                                                                                              
  {
    id: 1,
    timestamp: 1656076800000,
    price: 20,
    category: 'Food',
    itemName: 'Pizza'
  },
  {
    id: 2,
    timestamp: 1656105600000,
    price: 20,
    category: 'Food',
    itemName: 'Burger'
  },
  {
    id: 3,
    timestamp: 1656134400000,
    price: 30,
    category: 'Cloth',
    itemName: 'Sushi'
  }
])

module.exports = calculateTotalSpentByCategory;
