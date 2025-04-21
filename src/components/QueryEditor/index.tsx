import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const MemoizedEditor = memo(Editor);

function QueryEditor() {
  const [isDirty, setIsDirty] = useState(false);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const queryNameInputRef = useRef<HTMLInputElement | null>(null);

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
    const queryName = queryNameInputRef.current?.value;

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
    let id = new Date().toISOString();
    if (selectedQuery && selectedQuery.id !== "-1") {
      id = selectedQuery.id;
    }
    const newQuery = {
      name: "New Query",
      datasourceId: selectedDatasource!.id,
      ...selectedQuery,
      id,
      query: value,
    };

    runQuery(newQuery, isDirty);
  };

  const handleOnEditorChange = useCallback(
    (value?: string) => {
      setValue(value ?? "");
      if (selectedQuery && selectedQuery.id !== "-1") {
        setIsDirty(true);
      }
    },
    [selectedQuery],
  );

  useEffect(() => {
    setValue(selectedQuery?.query ?? "");
    setIsDirty(false);
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
        <StyledInput id="query-name" ref={queryNameInputRef} />
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
      <MemoizedEditor
        height="100%"
        defaultLanguage="sql"
        theme="vs-light"
        defaultValue={"-- Select a datasource to run queries."}
        value={value}
        onChange={handleOnEditorChange}
        options={useMemo(
          () => ({
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 16,
            wordWrap: "on",
          }),
          [],
        )}
      />
    </GridArea>
  );
}

export default QueryEditor;
