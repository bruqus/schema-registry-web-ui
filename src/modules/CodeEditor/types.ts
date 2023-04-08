export type ICodeEditorProps = {
  code?: string;
  onCodeValidate?: (isValid: boolean) => void;
  onChange?: (code?: string) => void;
};

export type CodeEditorRef = {
  formatCode: () => void;
  editorRef: any;
};
