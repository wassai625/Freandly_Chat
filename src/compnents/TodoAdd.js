//他ファイルでTodoAddコンポーネントを利用できるようにするためexportしておく
export const TodoAdd = ({ buttonText, inputEl, handleAddTodoListeItem }) => {
    return (
        <>
            <textarea ref={inputEl} />
            {/*入力フォームにテキストを入力し、「+ TODOを追加」ボタンをクリックで新規TODOに追加 */}
            <button onClick={handleAddTodoListItem}>{buttonText}</button>
        </>
    );
};