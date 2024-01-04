'use client'
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";

const connectToDatabase = dynamic(
  () =>
    import("../../components/Lib/db.js").then((mod) => mod.connectToDatabase),
  {
    ssr: false,
  }
);

import dynamic from "next/dynamic";

const closeDatabaseConnection = () => {
  return import("../../components/Lib/db.js").then((mod) =>
    mod.closeDatabaseConnection()
  );
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (inputUsername: string, inputPassword: string) => {
    let client;

    try {
      client = await connectToDatabase();
      const collection = client.database.collection("users");
      const user = await collection.findOne({ username: inputUsername });

      if (user.compareSync(inputPassword, user.passwordHash)) {
        console.log("Log in Success");
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error in login:", error);
    } finally {
      if (client) {
        await closeDatabaseConnection();
      }
    }
  };

  const onClick = () => {
    handleLogin(username, password);
    console.log("Login");
  };

  return (
    <>
      <h1>Login</h1>
      <Paper variant="outlined" sx={{ width: 300, margin: "auto" }}>
        <div>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
        </div>
        <br />
        <div>
          <Button variant="contained" onClick={onClick}>
            Login
          </Button>
        </div>
      </Paper>
    </>
  );
}
