import { Editor } from "@monaco-editor/react";
import { FaPlay, FaSave } from "react-icons/fa";

import { GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { Select } from "../ui/Select";
import { useQueryStore } from "../../stores/queries.store";
import { useDatasourceStore } from "../../stores/datasource.store";
import { Title } from "../ui/Title";

function QueryEditor() {
  const queries = useQueryStore((state) => state.queries);
  const selectedQuery = useQueryStore((state) => state.selectedQuery);
  const setSelectedQuery = useQueryStore((state) => state.setSelectedQuery);
  const setSelectedDatasourceById = useDatasourceStore(
    (state) => state.setSelectedDatasourceById
  );
  const runQuery = useQueryStore((state) => state.runQuery);
  const handleSelectQuery = (queryId: string) => {
    const query = queries.find((q) => q.id === queryId);
    if (query) {
      setSelectedQuery(query);
      setSelectedDatasourceById(query.datasourceId);
    }
  };

  return (
    <GridArea $gridArea="query-editor">
      <ToolbarContainer>
        <Title>Query Editor</Title>
        <Select
          value={selectedQuery?.id ?? ""}
          options={queries.map((q) => ({ label: q.name, value: q.id }))}
          onChange={handleSelectQuery}
        />
        <IconButton text="Save Query" icon={<FaSave />} onClick={() => {}} />
        <IconButton text="Run" icon={<FaPlay />} onClick={runQuery} />
      </ToolbarContainer>
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme="vs-light"
        value={selectedQuery?.query ?? ""}
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
