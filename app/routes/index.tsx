import { H1 } from "~/components/typography/h1.component";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="hero bg-base-100">
        <div className="hero-content text-center">
          <H1>Remix Template</H1>

          <p>Welcome to your remix app.</p>
        </div>
      </div>
    </div>
  );
}
