import { Editor } from "@monaco-editor/react";
import { FaPlay, FaSave } from "react-icons/fa";

import { GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { Select } from "../ui/Select";

function QueryEditor() {
  return (
    <GridArea $gridArea="query-editor">
      <ToolbarContainer>
        <Select
          options={[
            { label: "Select saved queries", value: "" },
            { label: "Query 1", value: "1" },
            { label: "Query 2", value: "2" },
            { label: "Query 3", value: "3" },
          ]}
          onChange={() => {}}
        />
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
    </GridArea>
  );
}

export default QueryEditor;
