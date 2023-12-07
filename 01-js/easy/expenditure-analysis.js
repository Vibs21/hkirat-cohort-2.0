/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  // let a = transactions
  //             .map((val)=> {return val.category})
  //             .filter((val, index, arr) => {
  //               return arr.indexOf(val) == index;
  //             })

  let categorySum = transactions.reduce((accumulator, curVal) => {
     const {category, price} = curVal;
    
     if(!accumulator[category]) {
        accumulator[category] = 0;
     }

        accumulator[category] += price;
        
        return accumulator;
  }, {})

  const result = Object.keys(categorySum)
                        .map(category => ({
                          category,
                          totalSpent: categorySum[category]
                        }))
  
  console.log(result)
  return result;
}

// calculateTotalSpentByCategory([                                                                                                              
//   {
//     id: 1,
//     timestamp: 1656076800000,
//     price: 10,
//     category: 'Food',
//     itemName: 'Pizza'
//   },
//   {
//     id: 2,
//     timestamp: 1656105600000,
//     price: 20,
//     category: 'Food',
//     itemName: 'Burger'
//   },
//   {
//     id: 3,
//     timestamp: 1656134400000,
//     price: 30,
//     category: 'Cloth',
//     itemName: 'Sushi'
//   }
// ])

module.exports = calculateTotalSpentByCategory;
