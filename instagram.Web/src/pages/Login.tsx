import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useAuth } from "../AuthContext";
import { login } from "@/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      const user = await api.user.get();

      if (user) {
        setUser(user);
        toast({
          title: "Logged in successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/"); // redirect to home or dashboard
      } else {
        throw Error("Unable to find user after login.");
      }
    } catch (err) {
      toast({
        title: "Login error",
        description: (err as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6}>
        <Heading size="lg" textAlign="center">
          Log In to Your Account
        </Heading>

        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Log In
        </Button>

        <Text fontSize="sm" textAlign="center">
          Don’t have an account?{" "}
          <Button
            variant="link"
            size="sm"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Text>
      </Stack>
    </form>
  );
};

export default Login;
