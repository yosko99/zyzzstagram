import React from 'react';

const StoriesHolder = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <section className="main">
      <div className="wrapper">
        <div className="left-col">
          <div className="status-wrapper">{props.children}</div>
        </div>
      </div>
    </section>
  );
};

export default StoriesHolder;
