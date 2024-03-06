import * as React from "react";
import { useRenderCount } from "@uidotdev/usehooks";

export default function App() {
  const renderCount = useRenderCount();
  const [count, setCount] = React.useState(0);

  return (
    <section>
      <header>
        <h1>useRenderCount</h1>
        <h6>(strict mode on)</h6>
      </header>
      <button className="primary" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
      <p>Count: {count}</p>
      <p>Render Count: {renderCount}</p>
    </section>
  );
}