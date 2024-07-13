import { TablePagination } from "@mui/material";

interface MuiTablePaginationProps {
  page: number;
  page_size: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  count?: number;
  rowsPerPageOptions?: number[];
}

const MuiTablePagination = ({
  page,
  page_size,
  onPageChange,
  onPageSizeChange,
  rowsPerPageOptions = [10, 15, 20, 25, 30],
  count,
}: MuiTablePaginationProps) => {
  return (
    <TablePagination
      labelRowsPerPage="Show entries"
      labelDisplayedRows={({ from, to, count }) => {
        return `Showing ${from} to ${to} of ${count} entries`;
      }}
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={Number(count) } // count is now properly typed as number
      rowsPerPage={page_size}
      page={page - 1}
      onPageChange={(_, newPage) => onPageChange(newPage + 1)}
      onRowsPerPageChange={(event) => onPageSizeChange(+event.target.value)}
      showFirstButton
      showLastButton
      sx={{
        color: "primary.main",
      }}
    />
  );
};

export default MuiTablePagination;