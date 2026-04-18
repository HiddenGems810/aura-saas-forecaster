'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedCounter({ value, format = (v) => v.toString(), className }: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    mass: 1,
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  const displayValue = useTransform(springValue, (current) => format(current));

  return <motion.span style={{ fontVariantNumeric: 'tabular-nums' }} className={className}>{displayValue}</motion.span>;
}
