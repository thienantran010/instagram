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
import api from "@/api";
import { useAuth } from "../AuthContext";
import { getUser, login } from "@/utils";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };

      const _ = isLogin ? await login(data) : await api.register.post(data);

      const user = await api.user.get();
      if (user) {
        setUser(user);
        toast({
          title: isLogin
            ? "Logged in successfully!"
            : "Signed up successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw Error(
          "Unable to find user when logging in or failed to register"
        );
      }

      // Set user context or redirect here
    } catch (err) {
      toast({
        title: `${isLogin ? "Login" : "Signup"} error`,
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
          {isLogin ? "Log In to Your Account" : "Create a New Account"}
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
          {isLogin ? "Log In" : "Sign Up"}
        </Button>

        <Text fontSize="sm" textAlign="center">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Button
                variant="link"
                size="sm"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" size="sm" onClick={() => setIsLogin(true)}>
                Log in
              </Button>
            </>
          )}
        </Text>
      </Stack>
    </form>
  );
};

export default Auth;
