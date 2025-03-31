import { useState } from "react";
import styled from "styled-components";

type TableProps = {
  columns: string[];
  data: Record<string, unknown>[];
  itemsPerPage?: number;
};

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  position: relative;
`;

const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  background-color: var(--primary-color);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-bottom: 1px solid var(--border-color);
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: var(--hover-color);
  }
`;

const PageInfo = styled.span`
  color: var(--text-color);
  font-size: 0.875rem;
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

export const Table = ({ columns, data, itemsPerPage = 10 }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <TableContainer>
      <TableHeaderContainer>
        <PaginationControls>
          <PaginationButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          <PaginationButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationButton>
        </PaginationControls>
      </TableHeaderContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((column) => (
              <TableHeaderCell key={column}>{column}</TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${column}`}>
                  {String(row[column] ?? "")}
                </TableCell>
              ))}
            </tr>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};
