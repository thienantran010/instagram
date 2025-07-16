import { useAuth } from "@/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return `Hi ${user?.userName}`;
};

export default Home;
