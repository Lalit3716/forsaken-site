import { Editor } from "@monaco-editor/react";
import { FaPlay, FaSave } from "react-icons/fa";

import Container from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { SelectContainer, Select } from "../ui/Select";

function QueryEditor() {
  return (
    <Container $gridArea="query-editor">
      <ToolbarContainer>
        <SelectContainer>
          <Select>
            <option value="">Select saved queries</option>
            <option value="1">Query 1</option>
            <option value="2">Query 2</option>
            <option value="3">Query 3</option>
          </Select>
        </SelectContainer>
        <IconButton>
          Save Query
          <FaSave />
        </IconButton>
        <IconButton>
          Run
          <FaPlay />
        </IconButton>
      </ToolbarContainer>
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme="vs-light"
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
