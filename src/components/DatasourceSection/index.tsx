import { FaFileImport } from "react-icons/fa6";

import { IconButton } from "../ui/Button";
import { Container, GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { Select } from "../ui/Select";
import { useDatasourceStore } from "../../stores/datasource.store";
import { Table } from "../ui/Table";
import { Loading } from "../ui/Loading";

function DatasourceSection() {
  const loading = useDatasourceStore((state) => state.loading);
  const availableDatasources = useDatasourceStore(
    (state) => state.availableDatasources
  );
  const loadDatasource = useDatasourceStore((state) => state.loadDatasource);
  const selectedDatasource = useDatasourceStore(
    (state) => state.selectedDatasource
  );

  const handleSelectDatasource = async (datasource: string) => {
    if (datasource) await loadDatasource(datasource);
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
        <Select
          options={availableDatasources}
          onChange={handleSelectDatasource}
        />
        <IconButton
          text="Add Datasource"
          icon={<FaFileImport />}
          onClick={() => {}}
        />
      </ToolbarContainer>
      {renderContent()}
    </GridArea>
  );
}

export default DatasourceSection;
