import { Pagination, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface PaginationParams {
  numberOfPage: number;
  totalProducts: number;
  page: number;
  handleChange: (e:React.ChangeEvent<unknown>, v: number) => void
}

const theme = createTheme({
    palette: {
        mode: 'dark',
      },
});

const ListProductPagination = (params: PaginationParams) => {
  return (
    <ThemeProvider theme={theme}>
        
      <Pagination
       count={params.numberOfPage}
       page={params.page}
       defaultPage={1}
       siblingCount={1}
       boundaryCount={2}
       shape="circular"
       onChange={(e, v) => params.handleChange(e, v)}/>
      
    </ThemeProvider>
  );
};

export default ListProductPagination;
