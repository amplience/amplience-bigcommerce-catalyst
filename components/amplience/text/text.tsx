import { type Property } from 'csstype';
import ReactMarkdown from 'markdown-to-jsx';
import { Link } from '~/components/link';

interface TextProps {
  text: string;
  align: Property.TextAlign;
}

const Text = ({ text, align }: TextProps) => {
  const options = {
    overrides: {
      a: { component: Link },
      h1: {
        component: ({ ...props }) => (
          <h1 className="mb-4 mt-4 text-3xl font-black lg:text-5xl">
            <span {...props} />
          </h1>
        ),
      },
      h2: {
        component: ({ ...props }) => (
          <h2 className="mb-4 mt-4 text-2xl font-black lg:text-4xl">
            <span {...props} />
          </h2>
        ),
      },
      h3: {
        component: ({ ...props }) => (
          <h3 className="mb-4 mt-4 text-xl font-black lg:text-3xl">
            <span {...props} />
          </h3>
        ),
      },
      h4: {
        component: ({ ...props }) => (
          <h4 className="mb-4 mt-4 text-xl font-black lg:text-2xl">
            <span {...props} />
          </h4>
        ),
      },
      h5: {
        component: ({ ...props }) => (
          <h5 className="mb-4 mt-4 text-xl font-black lg:text-xl">
            <span {...props} />
          </h5>
        ),
      },
      h6: {
        component: ({ ...props }) => (
          <h5 className="mb-4 mt-4 font-black">
            <span {...props} />
          </h5>
        ),
      },
      li: {
        component: ({ ...props }) => (
          <li>
            <span {...props} />
          </li>
        ),
      },
    },
  };

  return (
    <div
      className="[&_img]:w-full [&_ul]:me-[0px] [&_ul]:ms-[0px] [&_ul]:block [&_ul]:list-disc [&_ul]:ps-[40px]"
      style={{ textAlign: align }}
    >
      {Boolean(text) && <ReactMarkdown options={options}>{text}</ReactMarkdown>}
    </div>
  );
};

export default Text;
