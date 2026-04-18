'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SliderWithTooltipProps {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  /**
   * If provided, renders colored zone indicators below the track.
   * Each zone: { min, max, color, label }
   */
  zones?: { min: number; max: number; color: string; label: string }[];
  formatTooltip?: (v: number) => string;
}

export function SliderWithTooltip({
  id,
  min,
  max,
  step,
  value,
  onChange,
  zones,
  formatTooltip,
}: SliderWithTooltipProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  const label = formatTooltip ? formatTooltip(value) : `${value}`;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
    [onChange]
  );

  return (
    <div className="relative w-full" ref={trackRef}>
      {/* Floating tooltip */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute pointer-events-none z-20"
            style={{
              /* Exact math to place it directly over the center of a 12px thumb: */
              left: `calc(${percent}% + ${6 - percent * 0.12}px)`,
              transform: 'translateX(-50%)',
              top: '-35px',
            }}
          >
            <div className="bg-[var(--accent-color)] text-black text-[10px] font-bold font-mono px-2.5 py-1 rounded-md shadow-[0_10px_30px_rgba(212,175,55,0.4)] whitespace-nowrap select-none border border-white/20">
              {label}
              {/* Caret */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid var(--accent-color)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Native range input */}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onFocus={() => setIsDragging(true)}
        onBlur={() => setIsDragging(false)}
        className="w-full"
      />

      {/* Sweet-spot zone bands */}
      {zones && (
        <div className="relative w-full h-[4px] mt-1.5 rounded-full overflow-hidden flex">
          {zones.map((zone, i) => {
            const zoneStart = Math.max(zone.min, min);
            const zoneEnd = Math.min(zone.max, max);
            if (zoneEnd <= zoneStart) return null;
            const leftPct = ((zoneStart - min) / (max - min)) * 100;
            const widthPct = ((zoneEnd - zoneStart) / (max - min)) * 100;
            return (
              <div
                key={i}
                className="absolute h-full rounded-full"
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  backgroundColor: zone.color,
                  opacity: 0.5,
                }}
                title={zone.label}
              />
            );
          })}
        </div>
      )}

      {/* Zone labels (only if zones provided) */}
      {zones && (
        <div className="relative w-full mt-1 flex" style={{ height: '14px' }}>
          {zones.map((zone, i) => {
            const zoneStart = Math.max(zone.min, min);
            const zoneEnd = Math.min(zone.max, max);
            if (zoneEnd <= zoneStart) return null;
            const leftPct = ((zoneStart - min) / (max - min)) * 100;
            const widthPct = ((zoneEnd - zoneStart) / (max - min)) * 100;
            return (
              <div
                key={i}
                className="absolute text-[8px] font-mono uppercase tracking-widest text-center leading-none"
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  color: zone.color,
                  opacity: 0.7,
                }}
              >
                {zone.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
