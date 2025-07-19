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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.register.post({ email, password });
      await login({ email, password });
      const user = await api.user.get();

      if (user) {
        setUser(user);
        toast({
          title: "Signed up successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/"); // redirect to home or dashboard
      } else {
        throw Error("Unable to find user after signup.");
      }
    } catch (err) {
      toast({
        title: "Signup error",
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
          Create a New Account
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
          Sign Up
        </Button>

        <Text fontSize="sm" textAlign="center">
          Already have an account?{" "}
          <Button variant="link" size="sm" onClick={() => navigate("/login")}>
            Log in
          </Button>
        </Text>
      </Stack>
    </form>
  );
};

export default Register;
