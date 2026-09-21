import { Children, isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mermaid } from "@/components/Mermaid";

function mermaidChartFromPre(children: ReactNode): string | null {
  const child = Children.toArray(children)[0];
  if (!isValidElement<{ className?: string; children?: React.ReactNode }>(child)) {
    return null;
  }
  if (!child.props.className?.includes("language-mermaid")) {
    return null;
  }
  return String(child.props.children ?? "");
}

export function PostMarkdown({ content }: { content: string }) {
  return (
    <div className="markdown">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            const chart = mermaidChartFromPre(children);
            if (chart) {
              return <Mermaid chart={chart} />;
            }
            return <pre>{children}</pre>;
          },
          img({ src, alt }) {
            if (!src || typeof src !== "string") {
              return null;
            }
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt ?? ""} />
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
