import { motion } from 'framer-motion';

export function AmbientBackground() {
  return (
    <div className="ambient-background" data-testid="ambient-background" aria-hidden="true">
      <motion.div
        className="ambient-orb ambient-orb-a"
        initial={{ x: '-8%', y: '-4%', scale: 0.9 }}
        animate={{ x: '7%', y: '6%', scale: 1.08 }}
        transition={{ duration: 19, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-orb ambient-orb-b"
        initial={{ x: '4%', y: '0%', scale: 1 }}
        animate={{ x: '-6%', y: '8%', scale: 1.14 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-orb ambient-orb-c"
        initial={{ x: '0%', y: '0%', scale: 0.95 }}
        animate={{ x: '3%', y: '-4%', scale: 1.06 }}
        transition={{ duration: 17, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </div>
  );
}
