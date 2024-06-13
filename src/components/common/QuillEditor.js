import { useEffect, useRef, useMemo, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import * as memoAPI from '../../lib/api/memo';
// import axios from 'axios';

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

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*')
        input.click();
    
        input.addEventListener('change', async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);
            
            try{
                // const response = await axios.post('http://localhost:4000/memo/upload', formData);
                const response = await memoAPI.uploadFile(formData);
    
                const IMG_URL = response.data.url;
                const editor = quillInstance.current;

                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', IMG_URL);
            }catch(e){
                console.error(e);
            }
        })
    }, []);

    const options = useMemo(() => {
        return {
            // debug: 'info',
            modules: { 
                toolbar: {
                    container: [
                        [{header: '1'}, {header: '2'}],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{size: ['small', 'large', 'huge']}],
                        [{list: 'ordered'}, {list: 'bullet'}],
                        ['blockquote', 'code-block', 'link', 'image']
                    ],
                    handlers: {
                        image: imageHandler,
                    }
                }
            },
            placeholder: '내용을 입력해 주세요...',
            theme: 'bubble'
        };
    }, [imageHandler]);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, options);

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if(source === 'user'){
                onChangeBody({key: 'body', value: quill.root.innerHTML});
            }
        });
    }, [onChangeBody, options]);

    useEffect(() => {
        if(memo)
            quillInstance.current.root.innerHTML = memo.content;
        else if(!memo)
            quillInstance.current.root.innerHTML = '';
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