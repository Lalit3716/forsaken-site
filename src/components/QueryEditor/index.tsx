import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { FaPlay, FaSave } from "react-icons/fa";

import { GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { Select } from "../ui/Select";
import { useQueryStore } from "../../stores/queries.store";
import { useDatasourceStore } from "../../stores/datasource.store";
import { Title } from "../ui/Title";
import { Modal } from "../ui/Modal";
import { StyledInput } from "../ui/Input";

function QueryEditor() {
  const [open, setOpen] = useState(false);
  const queries = useQueryStore((state) => state.queries);
  const selectedQuery = useQueryStore((state) => state.selectedQuery);
  const selectedDatasource = useDatasourceStore(
    (state) => state.selectedDatasource
  );
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

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <GridArea $gridArea="query-editor">
      <Modal
        isOpen={open}
        onClose={closeModal}
        title={`Saving Query for ${selectedDatasource?.name}`}
        primaryAction={{ label: "Save", onClick: () => {} }}
        secondaryAction={{ label: "Cancel", onClick: closeModal }}
      >
        <label htmlFor="query-name">Query Name</label>
        <StyledInput id="query-name" />
      </Modal>
      <ToolbarContainer>
        <Title>Query Editor</Title>
        <Select
          value={selectedQuery?.id ?? ""}
          options={queries.map((q) => ({ label: q.name, value: q.id }))}
          onChange={handleSelectQuery}
        />
        <IconButton
          text="Save Query"
          icon={<FaSave />}
          onClick={() => setOpen(true)}
          disabled={!selectedDatasource}
        />
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
