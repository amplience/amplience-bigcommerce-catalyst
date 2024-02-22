import { type Property } from 'csstype';
import ReactMarkdown from 'markdown-to-jsx';

interface TextProps {
  text: string;
  align: Property.TextAlign;
}

const Text = ({ text, align }: TextProps) => {
  return (
    <div
      className="[&_img]:w-full [&_ul]:me-[0px] [&_ul]:ms-[0px] [&_ul]:block [&_ul]:list-disc [&_ul]:ps-[40px]"
      style={{ textAlign: align }}
    >
      {Boolean(text) && <ReactMarkdown>{text}</ReactMarkdown>}
    </div>
  );
};

export default Text;
