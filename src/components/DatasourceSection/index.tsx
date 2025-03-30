import { FaFileImport } from "react-icons/fa6";

import { IconButton } from "../ui/Button";
import { GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { Select } from "../ui/Select";

function DatasourceSection() {
  return (
    <GridArea $gridArea="datasource-section">
      <ToolbarContainer>
        <Select
          options={[
            { label: "Select datasource", value: "" },
            { label: "Datasource 1", value: "1" },
            { label: "Datasource 2", value: "2" },
            { label: "Datasource 3", value: "3" },
          ]}
          onChange={() => {}}
        />
        <IconButton>
          Add Datasource
          <FaFileImport />
        </IconButton>
      </ToolbarContainer>
      <p>Datasource Section</p>
    </GridArea>
  );
}

export default DatasourceSection;
