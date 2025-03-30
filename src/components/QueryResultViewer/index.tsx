import { BiImport } from "react-icons/bi";

import { Container, GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { Title } from "../ui/Title";
function QueryResultViewer() {
  return (
    <GridArea $gridArea="query-result-viewer">
      <ToolbarContainer>
        <Title>Query Result Viewer</Title>
        <IconButton text="Export" icon={<BiImport />} onClick={() => {}} />
      </ToolbarContainer>
      <Container $centered>Execute a query to view results</Container>
    </GridArea>
  );
}

export default QueryResultViewer;
