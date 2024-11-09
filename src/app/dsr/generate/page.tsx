"use client"

import { useEffect } from "react";

export default function GenerateCode() {
  const code = () => {
    const length = 8
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  console.log(code())

  useEffect(()=> {
    const generatedCode = code()

  location.href = `/dsr/scan/${generatedCode}`
  }, [])



  return (
    <div>
      <h2>Generating...</h2>
    </div>
  );
}
