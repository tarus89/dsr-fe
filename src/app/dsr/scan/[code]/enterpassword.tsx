import DsrAPI from "@/services/api";
import { ICheckPassRes, IDsr, IResponse } from "@/services/types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";

export default function EnterPassword({ code, onSuccess, }: { code: string, onSuccess: (dsrData: IDsr | IResponse| null)=> void, }) {
  const [recordFound, setRecordFound] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");


  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const submitPassword = async () => {
    if (validatePassword()) {
      const res: ICheckPassRes = await DsrAPI.fetchPassApi(
        code as string,
        password
      );
      console.log("got Res:", res);
      if( res.recordFound ) {
        onSuccess(res.dsrData)
      } else {
        setRecordFound(false);
      }
      
    }
    return;
  };
  const validatePassword = (): boolean => {
    if (password.length == 0) {
      return false;
    }
    return true;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafc",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Instructional Comment */}
        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
          Please check your email for the password shared and input the password
          below.
        </Typography>

        {/* Password Input */}
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          sx={{
            marginBottom: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00796b", // Customize border color
              },
              "&:hover fieldset": {
                borderColor: "#004d40",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00796b",
              },
            },
          }}
        />

        {/* Res Message */}
        {
            (recordFound != null && !recordFound) &&
                <Typography color="error.main" sx={{ marginBottom: 2 }}>
                    Please input the correct password!
                </Typography>
        }
        {/* {resMessage !== 0 &&
          (resMessage === 200 ? (
            <Typography color="success.main" sx={{ marginBottom: 2 }}>
              Customer record found!
            </Typography>
          ) : (
            <Typography color="error.main" sx={{ marginBottom: 2 }}>
              Please input the correct password!
            </Typography>
          ))} */}

        {/* Submit Button */}
        <Button
          onClick={submitPassword}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#00796b",
            "&:hover": {
              backgroundColor: "#004d40",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
