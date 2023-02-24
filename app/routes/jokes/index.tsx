import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

// still not using json or LoaderArgs. Still not sure if I should be.
export const loader = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  return randomJoke;
};

export default function JokesIndexRoute() {
  const randomJoke = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>
        {randomJoke.content}
      </p>
    </div>
  );
}  