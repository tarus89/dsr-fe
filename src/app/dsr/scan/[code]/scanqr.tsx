import DsrAPI from "@/services/api";
import { CheckPassResUnion } from "@/services/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";


type IProps = { setHasPassword: (b: boolean)=> void, code:string,setData: (br:CheckPassResUnion) => void}
export default function ScanQrCode({ code, setHasPassword,setData }: IProps){
    const [loading, setLoading] = useState(false)

    const initialDelay = 50000; // delay of 50 seconds before execution
    const lapTime = 25000; // every 25 seconds
    const maxExecPeriod = 180000; // stop execution after 3 minutes
    
    useEffect(() => {
        setTimeout(() => {

            const intervalId = setInterval(async () => {
                checkIfHasDataClick()
            }, lapTime);

            //clears the interval after 3 minutes
            setTimeout(() => {
                clearInterval(intervalId);
                console.log("Scheduled synchronization stoped!!");
            }, maxExecPeriod + initialDelay);

        }, initialDelay);
    }, [code]);

    async function checkIfHasDataClick(): Promise<void> {

        setLoading(true)
        console.log("Button clicked", code);
        const { hasRecord, isPasswordless, record } = await DsrAPI.hasRecord(code as string);
        console.log("Has record", hasRecord);
        console.log("Is Passwordless", isPasswordless);
        setLoading(false)
        setHasPassword(!isPasswordless)
        setData(record)
    }


    return (
    <Box
          component="main"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            backgroundColor: "#f5f5f5", // Optional: Add a background color
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" component="h1" align="center">
              Code: {code}
            </Typography>
            <Typography variant="body1" align="center">
              Scan the QR Code below to get the code:
            </Typography>

            <Box
              sx={{
                padding: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <QRCode value={(code || "").toString()} size={200} />
            </Box>

            {/* User Guide Section */}
            <Box
              sx={{
                maxWidth: 400,
                textAlign: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" component="h2">
                How to Use the QR Code
              </Typography>
              <Typography variant="body2" color="textSecondary" align="justify">
                1. Open your camera app or a QR code scanner.
                <br />
                2. Point your device&apos;s camera at the QR Code.
                <br />
                3. Click on the notification that appears to access the code.
                <br />
                4. Procede to the link with the code shared on your device.
              </Typography>
            </Box>

            {/* Button with spacing below */}
            <Button
                onClick={checkIfHasDataClick}
                disabled={loading}
                id="resyncButton"
                variant="contained"
                color="primary"
                
                sx={{ marginTop: 2 }}
            >
                { loading ? "Checking..." : "Sync Data" }
            </Button>
          </Stack>
        </Box>
)
}