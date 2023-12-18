function sum(a, b) {
    return new Promise(function (resolve, reject) {
      resolve(a + b);
    });
  }
  
  sum(5, 6)
    .then(function (result) {
      console.log(result);
    })
    .catch((err) => {
      console.log("err", err);
    });
  
  console.log("hello there from Vaibhav");
  
  async function check() {
    let result = await sum(6, 6);
    console.log(result);
  }
  
  check();
  // let a = async () => {
  
  // }
  