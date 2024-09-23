
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

interface MarkdownHtmlProps {
    content: string;
}

// マークダウンテキストをHTMLに変換
export default function MarkdownHtml({ content }: MarkdownHtmlProps) {

    const mdcomponents = {
        h1: ({ ...props }) => <h1 className="pl-2 border-gray-500 border-b-2 text-3xl text-black-500 font-semibold">{props.children}</h1>,
        h2: ({ ...props }) => <h2 className="pl-2 border-gray-500 border-l-2 border-b-2 text-2xl font-semibold">{props.children}</h2>,
        h3: ({ ...props }) => <h3 className="pl-2 border-gray-500 border-l-2 border-b-2 text-lg text-black-300 font-semibold">{props.children}</h3>,
        ul: ({ ...props }) => <ul className="list-disc pl-5 m-0">{props.children}</ul>,
        ol: ({ ...props }) => <ol className="list-decimal pl-5 m-0">{props.children}</ol>,
        table: ({ ...props }) => <table className="text-sm text-left text-gray-500 overflow-x-auto shadow-md sm">{props.children}</table>,
        thead: ({ ...props }) => <thead className="text-sm text-gray-700 bg-gray-50">{props.children}</thead>,
        th: ({ ...props }) => <th className="px-6 py-3">{props.children}</th >,
        tr: ({ ...props }) => <tr className="border-b">{props.children}</tr>,
        td: ({ ...props }) => <td className="px-6 py-3">{props.children}</td >,
    }

    return (<div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdcomponents}>{content}</ReactMarkdown>
    </div>);
}