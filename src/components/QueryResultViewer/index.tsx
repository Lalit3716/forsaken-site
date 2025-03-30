import { BiImport } from "react-icons/bi";

import { Container, GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";

function QueryResultViewer() {
  return (
    <GridArea $gridArea="query-result-viewer">
      <ToolbarContainer>
        <IconButton text="Export" icon={<BiImport />} onClick={() => {}} />
      </ToolbarContainer>
      <Container $centered>Execute a query to view results</Container>
    </GridArea>
  );
}

export default QueryResultViewer;
