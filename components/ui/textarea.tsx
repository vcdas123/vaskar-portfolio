import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error = '', ...props }, ref) => {
  return (
    <div>
      <textarea
        className={cn(
          `flex min-h-[80px] w-full rounded-lg border`,
          error ? 'border-red-500 focus-visible:ring-red-500' : 'border-white/10 focus-visible:ring-accent',
          'bg-primary px-4 py-5 text-base placeholder:text-white/60',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea';

export { Textarea };
