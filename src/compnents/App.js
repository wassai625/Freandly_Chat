import React, { useRef } from "react";

import { useTodo } from "../hooks/useTodo";

//TodoTitleコンポーネント
import { TodoTitle } from "./TodoTitle";

//TodoAddコンポーネントをimport
import { TodoAdd } from "./TodoAdd";

//TodoListコンポーネントをimport
import { TodoList } from "./TodoList";


function App() {
  //useTodo()カスタムフックで作成したtodoList addTodoListItemを利用する
  const {
    todoList, //TODOの現在の状態
    addTodoListItem, //新規TODOを追加する関数
    toggleTodoListItemStatus,
    deleteTodoListItem
  } = useTodo();

  //useRefでRefオブジェクトを作成
  const inputEl = useRef(null);

  //TODO入力フォームで入力された文字列を新しいTODOに登録するための
  //handleAddTodoListItem関数を宣言
  const handleAddTodoListItem = () => {

    //何も入力されていない場合にクリックしても何も返さない
    if (inputEl.current.value === "") return;

    //テキストエリアに入力されたテキストを新規TODOとして追加
    //追加したら、テキストエリアを空の文字列にする
    //新規TODOを追加するaddTodoListItem関数を「+TODOを追加」ボタンをクリックで実行
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  };

  //「TODOの状態を未完了」の要素を持つ新規配列を作成
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  //「TODOの状態が完了」の要素を持つ新規配列を作成
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  return(
    <>
      <TodoTitle title="TODO進捗管理" as="h1" />
      <TodoAdd
        //ボタンに表示させるテキストをbuttontextに代入してpropsで子コンポーネントへ渡す
        buttonText="+ TODOを追加"
        inputEl={inputEl}
        handleAddTodoListeItem={handleAddTodoListItem}
      />

      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}

        //TodoListコンポーネント内にTodoTitleコンポーネントをimportしているので
        //見出しテキストをpropsで子コンポーネントへ渡す
        title="未完了TODOリスト"

        //見出しのh2をasに代入し、propsで子コンポーネントへ渡す
        as="h2"
      />

      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}

        //TodoListコンポーネント内にTodoTitleコンポーネントをimportしているので
        //見出しテキストをpropsで子コンポーネントへ渡す
        title="完了TODOリスト"

        as="h2"
      />
      
    </>
  );
}

export default App;