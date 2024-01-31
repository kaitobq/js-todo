// 各オブジェクトの取得
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
// ローカルストレージに保存されたtodosというキーを持つアイテムを取得
const todos = JSON.parse(localStorage.getItem("todos"));

// todosが取得できたとき（todos.length > 0 のとき）todosの情報をローカルストレージに保存されている情報と同期
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

// 入力欄でsubmitされた時通常の動作（ページの再読み込み等）をキャンセル
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //   console.log(input.value);
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");
    li.innerText = todoText; /*liのテキストに取得したinputの値を代入*/
    li.classList.add("list-group-item"); /*追加するliのクラスを指定*/

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    li.addEventListener("contextmenu", function (event) {
      event.preventDefault(); /*contextmenuは右クリック。通常右クリックでメニューが呼ばれる。preventDefaultでデフォルトの機能（メニュー）を呼び出さないようにする。*/
      li.remove();
      saveData();
    });

    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });

    ul.appendChild(li); /*ulの子としてliを追加*/
    input.value = ""; /*入力欄を空にする*/
    saveData();
  }
}

// liタグのテキストをすべて取得してローカルストレージに保存
function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];
  lists.forEach((list) => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through"),
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
