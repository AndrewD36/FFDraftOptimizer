export async function getSleeperUser(username: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sleeper/user/${username}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Sleeper user");
  }

  return response.json();
}