import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return `That joke is too short`;
  }
}

function validateJokeName(name: string) {
  if (name.length < 3) {
    return `That joke's name is too short`;
  }
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");

  if (
    typeof name !== "string" ||
    typeof content !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }
  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };

  const fields = { name, content };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const joke = await db.joke.create({
    data: fields,
  });
  return redirect(`/jokes/${joke.id}`);
}


export default function NewJokeRoute() {
    return (
      <div>
        <p>Add your own hilarious joke</p>
        <form method="post">
          <div>
            <label>
              Name: <input type="text" name="name" />
            </label>
          </div>
          <div>
            <label>
              Content: <textarea name="content" />
            </label>
          </div>
          <div>
            <button type="submit" className="button">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
  