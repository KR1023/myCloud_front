import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

import styled from 'styled-components';

const QuillWrapper = styled.div`
    position: absolute;
    height: 82%;
    width: 95%;
    z-index: 30;
`;

const QuillEditor = ({memo, onChangeBody}) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        const options = {
            // debug: 'info',
            modules: {
                toolbar: [
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{size: ['small', 'large', 'huge']}],
                    [{list: 'ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image']
                ]
            },
            placeholder: '내용을 입력해 주세요...',
            theme: 'bubble'
        };

        quillInstance.current = new Quill(quillElement.current, options);

        const quill = quillInstance.current;
        quill.on('text-change', (delat, oldDelta, source) => {
            if(source === 'user'){
                onChangeBody({key: 'body', value: quill.root.innerHTML});
            }
        });
    }, [onChangeBody]);

    useEffect(() => {
        if(memo)
            quillInstance.current.root.innerHTML = memo.content;
    }, [memo]);

    return(
        <>
            <QuillWrapper>
                <div ref={quillElement}></div>
            </QuillWrapper>
            
        </>
    );
};

export default QuillEditor;