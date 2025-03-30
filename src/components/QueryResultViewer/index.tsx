import { BiImport } from "react-icons/bi";

import { GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";

function QueryResultViewer() {
  return (
    <GridArea $gridArea="query-result-viewer">
      <ToolbarContainer>
        <IconButton text="Export" icon={<BiImport />} onClick={() => {}} />
      </ToolbarContainer>
      <p>Query Result Viewer</p>
    </GridArea>
  );
}

export default QueryResultViewer;
