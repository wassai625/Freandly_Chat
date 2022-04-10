//TodoTitleコンポーネントをimport
import { TodoTitle } from "./TodoTitle";

//TodoItemコンポーネントをimport
import { TodoItem } from "./TodoItem";

//他ファイルでTodoListを利用できるようにするためexportしておく
export const TodoList = ({
    todoList,
    toggleTodoListItemStatus,
    deleteTodoListItem,
    title,
    as
}) => {
    return (
        <>
            {/*todoListの配列の中身が空の場合は、見出しとTODOリストの両方を表示させない*/}
            {todoList.length !== 0 && (
                <>
                    <TodoTitle title={title} as={as} />
                    <ul>
                            {todoList.map((todo) => (
                                <TodoItem
                                    todo={todo}
                                    key={todo.id}
                                    toggleTodoListItemStatus={toggleTodoListItemStatus}
                                    deleteTodoListItem={deleteTodoListItem}
                                />
                            ))}
                    </ul>
                </>
            )}
        </>
    );
};
