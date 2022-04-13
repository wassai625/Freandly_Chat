import React, {memo} from "react";

import { Heading } from "@chakra-ui/react";

//他ファイルでTodoTitleコンポーネントを利用できるようにするためexportしておく
//React.memo でパフォーマンスチューニングしてみる
export const TodoTitle = memo(({ title, as, fontSize, mt }) => {
    return (
        <Heading mt={mt} as={as} fontSize={fontSize} w="full">
            {title}
        </Heading>
    );
});

