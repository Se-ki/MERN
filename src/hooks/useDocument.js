import { useEffect } from "react";

const useDocument = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `Blog World | ${title}`;
        } else {
            document.title = 'Blog World';
        }
    }, [title])
}

export default useDocument;