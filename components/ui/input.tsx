import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface InputProps extends React.ComponentProps<'input'> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error = '', ...props }, ref) => {
  return (
    <div>
      <input
        type={type}
        className={cn(
          'flex h-[48px] w-full rounded-lg border',
          error
            ? 'border-red-500 focus:border-red-500 focus-visible:ring-red-500'
            : 'border-white/10 focus:border-accent focus-visible:ring-accent',
          'font-light bg-primary px-4 py-5 text-base placeholder:text-white/60',
          'outline-none',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-red-500 text-sm mt-2 block"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
