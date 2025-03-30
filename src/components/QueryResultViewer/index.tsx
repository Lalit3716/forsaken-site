import { BiImport } from "react-icons/bi";

import Container from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";

function QueryResultViewer() {
  return (
    <Container $gridArea="query-result-viewer">
      <ToolbarContainer>
        <IconButton>
          Export
          <BiImport />
        </IconButton>
      </ToolbarContainer>
      <p>Query Result Viewer</p>
    </Container>
  );
}

export default QueryResultViewer;
