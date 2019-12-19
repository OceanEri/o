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

document.getElementById("login").addEventListener("click", submitL); //eventlistener for login 
function submitL() {
  var loginInfo = {}
  loginInfo.email = document.getElementById.("email").value;
  loginInfo.password = document.getElementById.("password").value;
  var ss = SpreadsheetApp.openById("15rUIxS8w53bvPZvTKuOdGw-ZP6eWMaykVJ26vqGBkEg");
  var ws = ss.getSheetByName("logindet");
  var loginList = ws.getRange(2, 1, ws.getLastRow() - 1, 3).getValues();
  var email = loginList.map(function (r) {
    return r[0]
  });

  var password = loginList.map(function (r) {
    return r[1]
  });

  var viewNameData = loginList.map(function (r) {
    return r[2]
  });
  var loginEmail = loginInfo.email;
  var loginPW = loginInfo.password;
  for (var i = 0; i < email.length; i++) {
    if ((loginEmail == email[i]) && (loginPW == password[i])) {
      document.getElementById("load").click();
    }
  }
}