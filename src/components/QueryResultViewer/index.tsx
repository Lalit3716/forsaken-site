import Container from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import Button from "../ui/Button";

function QueryResultViewer() {
  return (
    <Container $gridArea="query-result-viewer">
      <ToolbarContainer>
        <Button>Export</Button>
      </ToolbarContainer>
      <p>Query Result Viewer</p>
    </Container>
  );
}

export default QueryResultViewer;
