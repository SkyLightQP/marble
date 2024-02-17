import { motion } from 'framer-motion';
import { FC } from 'react';
import { RootLayout } from '@/layouts/RootLayout';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const loadingCircleVariants = {
  start: {
    y: '0%'
  },
  end: {
    y: '100%'
  }
};

const loadingCircleTransition = {
  duration: 0.6,
  repeatType: 'reverse',
  repeat: Infinity,
  ease: 'easeInOut'
} as const;

export const Loading: FC = () => {
  return (
    <RootLayout className="h-screen w-screen">
      <div className="min-h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">게임을 준비하는 중...</h1>
        <h1 className="text-xl font-bold">잠시만 기다려주세요.</h1>

        <div className="mt-4">
          <motion.div
            className="w-16 h-14 flex justify-around"
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-black"
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-black"
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-black"
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
          </motion.div>
        </div>
      </div>
    </RootLayout>
  );
};
