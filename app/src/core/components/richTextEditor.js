import { Button, Space } from 'antd';
import React, { Component, forwardRef, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const RichTextEditor = forwardRef(({ onCancel, onAdd }, ref) => {
  const [editorState, setEditorState] = useState(null);
  const [editorHtml, setEditorHtml] = useState(null);
  const onEditorStateChange = (editorState) =>{
    const _html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorHtml(_html);
  }
  const onAddClick = (event) => {
    if (onAdd)
      onAdd(editorHtml);
  }
  return (
    <>
      <Space direction='vertical'>
        <Editor
          initialContentState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          wrapperStyle={{}}
          editorStyle={{ border: "1px solid lightgray" }}
          toolbarStyle={{}}
          ref={ref}
        />
        <div style={{ display: 'flex', flexFlow: 'row-reverse' }}>
          <Space align='center'>
            <Button size='middle' onClick={onAddClick}>Add</Button>
            <Button size='middle' onClick={onCancel}>Cancel</Button>
          </Space>
        </div>
      </Space>
    </>
  )
})

export default RichTextEditor;