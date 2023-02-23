import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  console.log("$jokeId.tsx params: " + params);
  return params.jokeId;
};


export default function JokeRoute() {
  const jokeId = useLoaderData<typeof loader>();

    return (
      <div>
        <p>Here's your hilarious joke although I guess you wanted joke {jokeId}:</p>
        <p>
          (This one is hardcoded in $jokeid.tsx.) Why don't you find hippopotamuses hiding in trees?
          They're really good at it.
        </p>
      </div>
    );
  }
  