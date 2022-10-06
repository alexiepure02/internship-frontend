import { TextField } from "@mui/material";

const SearchBar = (props) => {
  return (
    <TextField
      id="outlined-search"
      label={"Search.."}
      value={props.searchInput}
      onChange={props.handleSearchChange}
      type="text"
      size="small"
      sx={{ mt: 2 }}
    />
  );
};

export default SearchBar;
