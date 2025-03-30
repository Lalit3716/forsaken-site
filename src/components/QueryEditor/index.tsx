import { Editor } from "@monaco-editor/react";

import Container from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import Button from "../ui/Button";

type QueryEditorProps = {
  value: string;
  onChange: (value?: string) => void;
};

function QueryEditor({ value, onChange }: Readonly<QueryEditorProps>) {
  return (
    <Container $gridArea="query-editor">
      <ToolbarContainer>
        <Button>Run</Button>
      </ToolbarContainer>
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
