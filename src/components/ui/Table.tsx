import styled from "styled-components";

type TableProps = {
  columns: string[];
  data: Record<string, unknown>[];
};

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

const TableHeader = styled.thead`
  background-color: var(--primary-color);
`;

const TableBody = styled.tbody`
  background-color: var(--background-color);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--secondary-color);
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  text-align: left;
  white-space: nowrap;
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  text-align: left;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
`;

export const Table = ({ columns, data }: TableProps) => {
  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column}>{column}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={`rowIndex`}>
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${column}`}>
                  {String(row[column] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};
