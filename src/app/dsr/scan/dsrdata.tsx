import { IDsr } from "@/services/types";
import { Box, Typography } from "@mui/material";

export default function DsrDataView({ dsr }: { dsr: IDsr }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">
          ID:
        </Typography>
        <Typography variant="body1">{dsr._id}</Typography> 
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">
          Account ID:
        </Typography>
        <Typography variant="body1">{dsr.accounId}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">
          Code:
        </Typography>
        <Typography variant="body1">{dsr.code}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">
          Share From:
        </Typography>
        <Typography variant="body1">{dsr.shareFrom}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">
          Share To:
        </Typography>
        <Typography variant="body1">{dsr.shareTo}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">
          Access expires on:
        </Typography>
        <Typography variant="body1">{dsr.expireOn}</Typography>
      </Box>
    </Box>
  );
}
