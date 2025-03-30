import { FaFileImport } from "react-icons/fa6";

import { IconButton } from "../ui/Button";
import { GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { SelectContainer, Select } from "../ui/Select";

function DatasourceSection() {
  return (
    <GridArea $gridArea="datasource-section">
      <ToolbarContainer>
        <SelectContainer>
          <Select>
            <option value="">Select datasource</option>
            <option value="1">Datasource 1</option>
            <option value="2">Datasource 2</option>
            <option value="3">Datasource 3</option>
          </Select>
        </SelectContainer>
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
