import React from 'react';

import CreateStoryButton from '../buttons/story/CreateStoryButton';

const MainPageStoriesPanel = (props: {
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
                <CreateStoryButton />
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

export default MainPageStoriesPanel;
