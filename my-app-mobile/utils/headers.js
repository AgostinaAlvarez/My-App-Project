export const auth_header = (token) => {
  const header = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return header;
};

export const public_header = {
  "Content-Type": "application/json",
};
