"use client";

import { useEffect, useId, useState } from "react";

let mermaidReady: Promise<typeof import("mermaid")> | null = null;

function loadMermaid() {
  if (!mermaidReady) {
    mermaidReady = import("mermaid").then((mod) => {
      mod.default.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: {
          fontFamily:
            "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif",
          primaryColor: "#d7ebe9",
          primaryTextColor: "#0b1220",
          primaryBorderColor: "#0f6e6a",
          lineColor: "#4a5568",
          secondaryColor: "#ffffff",
          tertiaryColor: "#f4f6f8",
          clusterBkg: "#ffffff",
          clusterBorder: "#d5dbe3",
        },
      });
      return mod;
    });
  }
  return mermaidReady;
}

export function Mermaid({ chart }: { chart: string }) {
  const reactId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      const mermaid = (await loadMermaid()).default;
      const { svg: rendered } = await mermaid.render(
        `mermaid-${reactId}`,
        chart.trim(),
      );
      if (!cancelled) {
        setSvg(rendered);
      }
    }

    void renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (!svg) {
    return (
      <pre className="mermaid-fallback" aria-hidden>
        {chart.trim()}
      </pre>
    );
  }

  return (
    <div
      className="mermaid-diagram"
      role="img"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
