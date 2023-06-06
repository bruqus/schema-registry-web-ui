import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';

import type { CodeEditorRef, ICodeEditorProps } from './types';

const CodeEditor = forwardRef<CodeEditorRef, ICodeEditorProps>(
  ({ code, onChange, onCodeValidate, readOnly = false }, ref) => {
    const editorRef = useRef<any>(null);

    const formatCode = useCallback(() => {
      editorRef.current?._actions['editor.action.formatDocument']._run();
    }, [editorRef]);

    useImperativeHandle(
      ref,
      () => ({
        formatCode,
        editorRef,
      }),
      [],
    );

    return (
      <Box sx={{ height: '100%' }}>
        <Editor
          value={code}
          language="json"
          height="100%"
          width="100%"
          onMount={(editor) => (editorRef.current = editor)}
          onChange={onChange}
          onValidate={(errors) => onCodeValidate?.(!errors.length)}
          options={{ minimap: { enabled: false }, readOnly }}
        />
      </Box>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';

export default CodeEditor;
