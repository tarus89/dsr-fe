"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

import ScanQrCode from "./scanqr";
import EnterPassword from "./enterpassword";
import DsrDataView from "../dsrdata";
import { CheckPassResUnion, IDsr } from "@/services/types";

export default function ScanCode() {
  const [hasPassword, setHasPassword] = useState(false);
  const [data, setData] = useState<CheckPassResUnion>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { code } = useParams();

  const setDsrData = (dsrData: CheckPassResUnion): void => {
    setIsLoading(true);
    setData(dsrData);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Data loading</h1>
      </div>
    );
  }
  if (data) {
    return <DsrDataView dsr={data as IDsr} code={code as string} />;
  }

  if (!hasPassword) {
    return (
      <ScanQrCode
        code={code as string}
        setHasPassword={(b: boolean) => {
          console.log("got our data amd now we are seting has password as ", b);

          setHasPassword(b);
        }}
        setData={function (dsrData: CheckPassResUnion): void {
          setData(dsrData);
        }}
      />
    );
  }
  if (hasPassword) {
    return (
      <EnterPassword
        onSuccess={(dsrData: CheckPassResUnion) => {
          console.log("password auth worked get dsr now ");
          setDsrData(dsrData);
        }}
        code={code as string}
      />
    );
  }
}
