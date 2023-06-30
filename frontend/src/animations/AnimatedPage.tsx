import React, { ReactNode } from 'react';

import { motion } from 'framer-motion';

const animations = {
  inital: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

interface Props {
  children: ReactNode;
}

export const AnimatedPage = ({ children }: Props) => {
  return (
    <motion.div
      variants={animations}
      initial={'inital'}
      animate={'animate'}
      exit={'exit'}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};
