import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { range } from '@/utils/Range';

const container = {
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const amountStyleMap: Record<number, string> = {
  1: 'grid-cols-1',
  3: 'grid-cols-3'
};

interface DiceItemProps {
  readonly keyPrefix?: string;
  readonly amount: number;
}

export const DiceItem: FC<DiceItemProps> = ({ keyPrefix, amount }) => {
  if (amount !== 5) {
    return (
      <motion.div
        key={`${keyPrefix}-${amount}-0`}
        className={clsx('grid h-24 w-24 rounded-xl border-2 border-black p-1', amountStyleMap[amount] ?? 'grid-cols-2')}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {range(0, amount).map((i) => (
          <motion.div
            key={`${keyPrefix}-${amount}-${i}`}
            className="h-4 w-4 rounded-full bg-black place-self-center"
            variants={item}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`${keyPrefix}-${amount}-0`}
      className="flex flex-col h-24 w-24 rounded-xl border-2 border-black p-1 justify-center items-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-row space-x-6">
        <motion.div
          key={`${keyPrefix}-${amount}-1`}
          className="h-4 w-4 rounded-full bg-black place-self-center"
          variants={item}
        />
        <motion.div
          key={`${keyPrefix}-${amount}-2`}
          className="h-4 w-4 rounded-full bg-black place-self-center"
          variants={item}
        />
      </motion.div>
      <motion.div className="m-2">
        <motion.div
          key={`${keyPrefix}-${amount}-3`}
          className="h-4 w-4 rounded-full bg-black place-self-center"
          variants={item}
        />
      </motion.div>
      <motion.div className="flex flex-row space-x-6">
        <motion.div
          key={`${keyPrefix}-${amount}-4`}
          className="h-4 w-4 rounded-full bg-black place-self-center"
          variants={item}
        />
        <motion.div
          key={`${keyPrefix}-${amount}-5`}
          className="h-4 w-4 rounded-full bg-black place-self-center"
          variants={item}
        />
      </motion.div>
    </motion.div>
  );
};
