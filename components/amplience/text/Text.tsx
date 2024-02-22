import {type Property} from 'csstype';
import ReactMarkdown from 'markdown-to-jsx';

type TextProps = {
  text: string;
  align: Property.TextAlign;
};

const Text = ({text, align}: TextProps) => {
  return (
    <div
      className="[&_ul]:block [&_ul]:list-disc [&_ul]:ps-[40px] [&_ul]:ms-[0px] [&_ul]:me-[0px] [&_img]:w-full"
      style={{textAlign: align}}
    >
      {text && <ReactMarkdown>{text}</ReactMarkdown>}
    </div>
  );
};

export default Text;
