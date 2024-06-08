import { useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const EditorBox = styled.div`
    width: 100%;
    height: 100%;
    outline: none;
`;

const ContextBox = styled.div`
    width: 200px;
    height: 20px;
    border: 1px solid red;
    position: absolute;
    left: 0px;
    top: 0px;
    visibility: hidden;
    display: flex;
    button{
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin: 10px;
    }
`;
const editorBox = document.getElementById('editor_box');

const TextEditor = () => {
    const contextMenu = useRef();

    const [showContext, setShowContext] = useState(true);    

    const showContextMenu = e => {
        e.preventDefault();
        setShowContext(true);

        /*
        console.log('client', e.clientX, e.clientY);
        const contextTop = getComputedStyle(contextMenu.current).left.replace('px', '');
        const contextLeft = getComputedStyle(contextMenu.current).top.replace('px', '');
        console.log('onContext', contextTop, contextLeft);
        */

        contextMenu.current.style.left = `${e.clientX}px`;
        contextMenu.current.style.top = `${e.clientY}px`;
        contextMenu.current.style.visibility = 'visible';

    };
    
    const onClick = e => {
        e.stopPropagation();
        setShowContext(false);
        console.log('onClick', e.clientX, e.clientY);
        contextMenu.current.style.visibility = 'hidden';
    }

    const setStyle = (e) => {
        const wordStyle = e.target.dataset.style;
        switch(wordStyle){
            case 'bold':
                console.log('bold');
                break;
            case 'italic':
                console.log('italic');
                break;
            case 'underline':
                console.log('underline');
                break;
            default: 
                return;
        }
    }

    function applyStyle(style){
        document.execCommand(style);
    }

    return (
        <div>
            <EditorBox id="editor_box" contentEditable={true} onClick={onClick} onContextMenu={showContextMenu}></EditorBox>
            <ContextBox ref={contextMenu} >
                <button id="btn-bold" onClick={setStyle} data-style="bold"><b data-style="bold">B</b></button>
                <button id="btn-italic" onClick={setStyle} data-style="italic" ><i data-style="italic">I</i></button>
                <button id="btn-underline" onClick={setStyle} data-style="underline"><u data-style="underline">U</u></button>
            </ContextBox>
        </div>
    );
};

export default TextEditor;