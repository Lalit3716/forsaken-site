import Container from "../ui/Container";
import { Editor } from "@monaco-editor/react";

type QueryEditorProps = {
  value: string;
  onChange: (value?: string) => void;
};

function QueryEditor({ value, onChange }: Readonly<QueryEditorProps>) {
  return (
    <Container $gridArea="query-editor">
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme="vs-light"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 12,
          wordWrap: "on",
        }}
      />
    </Container>
  );
}

export default QueryEditor;
