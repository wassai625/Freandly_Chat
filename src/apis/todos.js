import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";

//axios.get()でGETリクエストを送信
//サーバー上のすべてのTODO(todos)を所得する getAllTodoaData関数の宣言
//他ファイルでgetAllTodosData()を利用できるようにするためexportしておく
export const getAllTodosData = async () => {

    //戻される値はすべてresposeに保存される
    const response = await axios.get(todoDataUrl);

    //通信後、response.dataでレスポンスデータを返す
    return response.data;
};

//axios.post()で新規TODOを追加する、TODOを追加するaddTodoData関数の宣言
//他ファイルでaddTodoData()を利用できるようにするためにexportしておく
export const addTodoDate = async (todo) => {

    //第二引数に、送信したいデータを取得してPOST送信、サーバーに転送することで新規データを追加
    const response = await axios.post(todoDataUrl, todo);

    //通信後response.dataでレスポンスデータを返す
    return response.data;
};

//axios.delete()で一致したidのTODOを削除する、TODOを削除するdeleteTodoData関数を宣言
//他ファイルでdeleteTodoData()を利用できるようにexportしておく
export const deleteTodoData = async (id) => {
    await axios.delete(`${todoDataUrl}/${id}`);

    //通信後、削除したTODOのidを返す
    return id;
};

//axios.put()で一致したidのTODOを更新する、TODOを更新するupdateTodoData関数を宣言
//他ファイルでupdateTodoData()を利用できるようにexportしておく
export const updateTodoData = async(id,todo) => {

    //第２引数に更新したいデータを渡す
    const response = await axios.put(`${todoDataUrl}/${id}`,todo);

    //通信後、response.dataでレスポンスデータを返す
    return response.data;
};
