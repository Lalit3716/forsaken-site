import { BiImport } from "react-icons/bi";

import { Container, GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { Title } from "../ui/Title";
import { Table } from "../ui/Table";
import { useQueryStore } from "../../stores/queries.store";
import { Loading } from "../ui/Loading";
import { Badge } from "../ui/Badge";
import { exportToCSV } from "../../utils/export";

function QueryResultViewer() {
  const loading = useQueryStore((state) => state.loading);
  const result = useQueryStore((state) => state.result);
  const executionTime = useQueryStore((state) => state.executionTime);
  const selectedQuery = useQueryStore((state) => state.selectedQuery);

  const handleExport = () => {
    if (result) {
      const filename = selectedQuery
        ? `${selectedQuery.name}.csv`
        : "export.csv";
      exportToCSV(result, filename);
    }
  };

  const renderContent = () => {
    if (loading) return <Loading />;

    if (result) {
      return (
        <Table data={result?.data ?? []} columns={result?.columns ?? []} />
      );
    }

    return <Container $centered>Execute the query to view results</Container>;
  };

  return (
    <GridArea $gridArea="query-result-viewer">
      <ToolbarContainer>
        <Title>Query Result Viewer</Title>
        {executionTime !== null && (
          <Badge>Execution Time: {executionTime}ms</Badge>
        )}
        <IconButton
          text="Export"
          icon={<BiImport />}
          onClick={handleExport}
          disabled={!result}
        />
      </ToolbarContainer>
      {renderContent()}
    </GridArea>
  );
}

export default QueryResultViewer;
