import { useEffect, useState } from "react";
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
  const [value, setValue] = useState("");
  const [queryName, setQueryName] = useState("");
  const [open, setOpen] = useState(false);

  const {
    queries,
    selectedQuery,
    setSelectedQuery,
    runQuery,
    saveQuery,
    updateQuery,
    result,
    executionTime,
  } = useQueryStore();
  const { setSelectedDatasourceById, selectedDatasource } =
    useDatasourceStore();

  const handleSelectQuery = (queryId: string) => {
    const query = queries.find((q) => q.id === queryId);
    if (query) {
      setSelectedQuery(query);
      setSelectedDatasourceById(query.datasourceId);
    }

    if (query?.id === "-1") {
      setSelectedQuery(null);
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSaveQuery = () => {
    if (!queryName) return;
    const newQuery = {
      id: selectedQuery?.id ?? new Date().toISOString(),
      name: queryName,
      query: value,
      datasourceId: selectedDatasource!.id,
      result: result ?? undefined,
      executionTime: executionTime ?? undefined,
    };

    if (selectedQuery) {
      updateQuery(newQuery);
    } else {
      saveQuery(newQuery);
    }
    closeModal();
  };

  const handleRunQuery = () => {
    if (selectedQuery && selectedQuery.id !== "-1") {
      runQuery();
    } else {
      const newQuery = {
        id: Math.random().toString(),
        name: "New Query",
        query: value,
        datasourceId: selectedDatasource!.id,
      };
      runQuery(newQuery);
    }
  };

  useEffect(() => {
    if (selectedQuery) {
      setValue(selectedQuery.query);
      setQueryName(selectedQuery.name);
    } else {
      setValue("");
      setQueryName("");
    }
  }, [selectedQuery]);

  return (
    <GridArea $gridArea="query-editor">
      <Modal
        isOpen={open}
        onClose={closeModal}
        title={`Saving Query for ${selectedDatasource?.name}`}
        primaryAction={{ label: "Save", onClick: handleSaveQuery }}
        secondaryAction={{ label: "Cancel", onClick: closeModal }}
      >
        <label htmlFor="query-name">Query Name</label>
        <StyledInput
          id="query-name"
          value={queryName}
          onChange={(e) => setQueryName(e.target.value)}
        />
      </Modal>
      <ToolbarContainer>
        <Title>Query Editor</Title>
        <Select
          value={selectedQuery?.id ?? ""}
          options={queries.map((q) => ({ label: q.name, value: q.id }))}
          onChange={handleSelectQuery}
        />
        <IconButton
          text={selectedQuery ? "Edit Query" : "Save Query"}
          icon={<FaSave />}
          onClick={() => setOpen(true)}
          disabled={!selectedDatasource || !value}
        />
        <IconButton
          text="Run"
          icon={<FaPlay />}
          onClick={handleRunQuery}
          disabled={!selectedDatasource || !value}
        />
      </ToolbarContainer>
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme="vs-light"
        defaultValue={"-- Select a datasource to run queries."}
        value={value}
        onChange={(value) => setValue(value ?? "")}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 16,
          wordWrap: "on",
        }}
      />
    </GridArea>
  );
}

export default QueryEditor;
