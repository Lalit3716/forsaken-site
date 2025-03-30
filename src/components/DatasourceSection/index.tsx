import { FaFileImport } from "react-icons/fa6";

import { IconButton } from "../ui/Button";
import Container from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";

function DatasourceSection() {
  return (
    <Container $gridArea="datasource-section">
      <ToolbarContainer>
        <IconButton>
          Add Datasource
          <FaFileImport />
        </IconButton>
      </ToolbarContainer>
      <p>Datasource Section</p>
    </Container>
  );
}

export default DatasourceSection;
