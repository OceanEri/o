class Functor {

  constructor(value) {
    this.value = value
  }

  map(fn) {
    return Functor.of(fn(this.value))
  }

  static of(value) {
    return new Functor(value)
  }
}

let add = value => value + 1

let doubleAdd = value => value + 2

let multiply = value => value * value

Functor.of(1).map(add).map(doubleAdd).map(multiply)

// 构造 Promise 的 Functor 函子