import { FaFileImport } from "react-icons/fa6";

import { IconButton } from "../ui/Button";
import { GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { Select } from "../ui/Select";
import { useDatasourceStore } from "../../stores/datasource.store";

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
      <p>
        {loading ? "Loading..." : JSON.stringify(selectedDatasource?.dataSet)}
      </p>
    </GridArea>
  );
}

export default DatasourceSection;
