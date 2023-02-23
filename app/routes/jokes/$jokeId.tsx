import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const joke = await db.joke.findUnique({
    select: { name: true, content: true },
    where: { id: params.jokeId },
  });
  if (!joke) {
    throw new Error("Joke not found");
  }
  return joke;
};


export default function JokeRoute() {
  const joke = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>
        {joke.content}
      </p>
      <Link to=".">{joke.name} Permalink</Link>
    </div>
  );
}
