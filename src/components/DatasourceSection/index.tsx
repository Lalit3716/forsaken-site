import { FaFileImport } from "react-icons/fa6";
import { useRef } from "react";

import { IconButton } from "../ui/Button";
import { Container, GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { Select } from "../ui/Select";
import { useDatasourceStore } from "../../stores/datasource.store";
import { Table } from "../ui/Table";
import { Loading } from "../ui/Loading";
import { Title } from "../ui/Title";
import { useQueryStore } from "../../stores/queries.store";

function DatasourceSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loading = useDatasourceStore((state) => state.loading);
  const availableDatasources = useDatasourceStore(
    (state) => state.availableDatasources
  );
  const loadDatasource = useDatasourceStore((state) => state.loadDatasource);
  const selectedDatasource = useDatasourceStore(
    (state) => state.selectedDatasource
  );
  const addCustomDatasource = useDatasourceStore(
    (state) => state.addCustomDatasource
  );
  const clearSelectedQuery = useQueryStore((state) => state.clearSelectedQuery);

  const handleSelectDatasource = async (datasource: string) => {
    if (datasource) {
      await loadDatasource(datasource);
      clearSelectedQuery();
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await addCustomDatasource(file);
      } catch (error) {
        console.error("Failed to load custom datasource:", error);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderContent = () => {
    if (loading) return <Loading />;
    if (!selectedDatasource)
      return <Container $centered>Select a datasource to view data</Container>;

    return (
      <Table
        columns={selectedDatasource.dataSet.columns}
        data={selectedDatasource.dataSet.data}
      />
    );
  };

  return (
    <GridArea $gridArea="datasource-section">
      <ToolbarContainer>
        <Title>Datasource Viewer</Title>
        <Select
          value={selectedDatasource?.id ?? ""}
          options={availableDatasources}
          onChange={handleSelectDatasource}
        />
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <IconButton
          text="Add Datasource"
          icon={<FaFileImport />}
          onClick={() => fileInputRef.current?.click()}
        />
      </ToolbarContainer>
      {renderContent()}
    </GridArea>
  );
}

export default DatasourceSection;
