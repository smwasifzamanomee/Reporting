import { Box, Icon } from "@mui/material";
import { ImSpinner8 } from "react-icons/im";

const Spinner = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRadius: 1,
      }}
    >
      <Icon
        component={ImSpinner8}
        fontSize="large"
        color="primary"
        sx={{
          animation: "spin 1s linear infinite",
          "@keyframes spin": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        }}
      />
    </Box>
  );
};
export default Spinner;