import { BiImport } from "react-icons/bi";

import { Container, GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { Title } from "../ui/Title";
import { Table } from "../ui/Table";
import { useQueryStore } from "../../stores/queries.store";
import { Loading } from "../ui/Loading";
import { Badge } from "../ui/Badge";

function QueryResultViewer() {
  const query = useQueryStore((state) => state.selectedQuery);
  const loading = useQueryStore((state) => state.loading);

  const renderContent = () => {
    if (loading) return <Loading />;

    if (query?.result) {
      return (
        <Table
          data={query.result?.data ?? []}
          columns={query.result?.columns ?? []}
        />
      );
    }

    return <Container $centered>Execute the query to view results</Container>;
  };

  return (
    <GridArea $gridArea="query-result-viewer">
      <ToolbarContainer>
        <Title>Query Result Viewer</Title>
        {query?.executionTime !== undefined && (
          <Badge>Execution Time: {query?.executionTime}ms</Badge>
        )}
        <IconButton text="Export" icon={<BiImport />} onClick={() => {}} />
      </ToolbarContainer>
      {renderContent()}
    </GridArea>
  );
}

export default QueryResultViewer;
