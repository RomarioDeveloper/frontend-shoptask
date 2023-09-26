import { Button, Center, Heading, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { login } from "../api";

const Auth = () => {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      nav("/");
    }
  }, []);

  const onLoginClick = async () => {
    const token = await login({
      username,
      password,
    });

    if (token.message && !token.token) {
      toast.error(token.message);
    } else {
      localStorage.setItem("token", token.token);
      toast.success(token.message);
      setTimeout(() => {
        nav("/");
      }, 2000);
    }
  };

  return (
    <>
      <Center h="100vh">
        <Stack spacing={6}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button colorScheme="blue" onClick={onLoginClick}>
            Login
          </Button>
        </Stack>
      </Center>
      <Toaster />
    </>
  );
};

export default Auth;
