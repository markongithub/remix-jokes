import { Links, LiveReload, Outlet } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        Hello world from root.tsx
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
