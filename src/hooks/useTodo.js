import { useState, useEffect } from "react";

//一意のidを生成するulidをinport
import { ulid } from "ulid";

//src/apis/todo.js内で宣言してexportしておいた関数を
//importすることによりuseTodo.js内で利用できるようにする
//getAllTodoData,addTodoData,deletTodoData,updateTodoDataをtodoDataオブジェクトとしてまとめてimport
import * as todoData from "../apis/todos";

//useTodo()カスタムフックを外部ファイルで利用できるようにするためにexportしておく
export const useTodo = () => {

    //todoListは現在のTODOの状態
    //setTodoListは現在のtodoListの状態を更新するための関数
    //todoListの初期値は空の配列をセット
    const [todoList, setTodoList] = useState({});

    useEffect(() => {

        //useEffect()を使うことでコンポーネントのマウント後またはアンマウント後に処理を実行する
        //モックサーバーかたTODOデータを取得するgetAllTodoData()を実行
        todoData.getAllTodosData().then((todo) => {

            //モックサーバーからTODOデータを取得後、取得したTODOデータを反転させておくことで
            //TODOを追加した順に上から表示させることができる
            //Array.reverse()と、スプレット構文を組み合わせて並び替えを行うとともに、
            //元の配列要素の並び順に影響することなく新しい配列を作成できる
            //todoListの状態(state)を更新
            setTodoList([...todo].reverse());
        });
    },[]);

    //todoListのdone (完了/未完了)真偽値を反転させて更新するtoggleTodoListItemStatus関数を宣言
    const toggleTodoListItemStatus = (id, done) => {

        //find()は配列から条件に合う値を見つけ、最初にtrueになった要素の値を返し、要素を見つけた時点で処理を停止
        //done(完了/未完了)の状態を反転させたいtodoListItemのidを見つけ、条件に一致するtodoItemを返す
        const todoItem = todoList.find((item) => item.id === id);

        //現在のtodoListから条件に一致した要素であるtodoItemのdone (完了/未完了)を反転させる
        const newTodoItem = {...todoItem, done: !done};

        //updateTodoData()を利用して指定されたidのTODOを更新したら、続いてtodoListの状態も更新する
        todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
            const newTodoList = todoList.map((item) => 
            
            //idが異なる場合todoListから取り出したitemをそのまま返し、
            //同じ場合はdone (完了/未完了)の状態を反転させたupdateTodoを返して新しい配列newTodoListを作成
            item.id !== updatedTodo.id ? item : updatedTodo
            );
            setTodoList(newTodoList);
        });
    };

    //新規TODOを追加するaddTodoListItem関数を宣言
    const addTodoListItem = (todoContent) => {
        const newTodoItem = {

            //contentは追加するTODOの内容
            content: todoContent,

            //idにuildで生成された一意の値をセット
            id: ulid(),

            //追加されたTODOはデフォルトで未完了の状態にセット
            done: false
        };

        //addTodoData()を利用してTODOを更新したら、続いてtodoListの状態も更新
        //addTodoData()は新規TODOを追加する関数
        return todoData.addTodoDate(newTodoItem).then((addTodo) => {

            //todoListの状態 (state)をnewTodoItemが追加された状態に更新
            setTodoList([addTodo, ...todoList]);
        });
    };

    //TODOを削除するdeleteTodoListItem関数を宣言
    const deleteTodoListItem = (id) => {

        //todoを更新したらtodoListの状態も更新
        //deleteTodoData()を利用して指定されたidのTODOを削除したら、続いてtodoListの状態も更新する
        //deleteTodoData()は一致したidのTODOを削除する関数
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(

                //削除したTODOとidが一致しないTODOをフィルタリングして新しい配列を返す
                //idが一致したTODOは除外される
                (item) => item.id !== deleteListItemId
            );

            //todoListの状態 (state)を更新
            //todoListの状態 (state)を指定されたidのTODOが削除された状態に更新
            setTodoList(newTodoList);
        });
    };

    //作成した関数を返す
    return {
        todoList,
        toggleTodoListItemStatus,
        addTodoListItem,
        deleteTodoListItem
    };
};