import { Separator } from "@/components/ui/separator";

export default function RootHomePage() {
  return (
    <article>
      <h1>Cheat Sheets</h1>
      <Separator className="my-4" />

      <h2>Possible Ideas</h2>
      <ul>
        <li>More on NextJs</li>
        <li>Adding a chatbot that interacts with the docs</li>
      </ul>
    </article>
  );
}
