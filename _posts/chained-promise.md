## reference
https://api.jquery.com/category/deferred-object/
http://stackoverflow.com/questions/13651243/how-do-i-chain-a-sequence-of-deferred-functions-in-jquery-1-8-x
http://liubin.org/promises-book/#then-return-new-promise
http://www.alloyteam.com/2015/04/solve-callback-hell-with-generator/



https://jsbin.com/cihuhec/edit?html,js,console,output
```javascript
Promise.resolve().then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(1)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(2)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(3)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(4)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(5)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(6)
    }, 1000)
  ))
))

```

```
Promise.resolve().then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(1)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(2)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(3)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(4)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(5)
    }, 1000)
  ))
)).then((resolve) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
      console.log(6)
    }, 1000)
  ))
))

```
