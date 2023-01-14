const person = {
  name: 'Lee',
  address: 'Seoul',
  __proto__ : {age : 20}
}

console.log(Object.keys(person)) // [ 'name', 'address' ]
console.log(Object.values(person)) // [ 'Lee', 'Seoul' ]
console.log(Object.entries(person)) // [ [ 'name', 'Lee' ], [ 'address', 'Seoul' ] ]