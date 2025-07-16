const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch("https://localhost:7415/login?useCookies=true", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // <--- VERY IMPORTANT
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
};

const getUser = async () => {
  const response = await fetch("https://localhost:7415/user", {
    method: "GET",
    credentials: "include", // <--- VERY IMPORTANT
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

export { login, getUser };
