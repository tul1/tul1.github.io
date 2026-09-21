import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function PostMarkdown({ content }: { content: string }) {
  return (
    <div className="markdown">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
