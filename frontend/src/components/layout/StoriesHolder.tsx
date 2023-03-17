import React from 'react';

import { AiOutlinePlusCircle } from 'react-icons/ai';

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
          <div className="status-wrapper">
            <div className="status-card">
              <div className="profile-pic">
                <AiOutlinePlusCircle
                  role={'button'}
                  style={{ width: '100%', height: '100%', color: 'white' }}
                />
              </div>
              <p className="username">Your story</p>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesHolder;
