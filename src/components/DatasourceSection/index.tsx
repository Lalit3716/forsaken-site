import Button from "../ui/Button";
import Container from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";

function DatasourceSection() {
  return (
    <Container $gridArea="datasource-section">
      <ToolbarContainer>
        <Button>Add Datasource</Button>
      </ToolbarContainer>
      <p>Datasource Section</p>
    </Container>
  );
}

export default DatasourceSection;
