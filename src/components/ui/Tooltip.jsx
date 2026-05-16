import React, { useState, useRef, cloneElement, isValidElement } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, content, position = 'right', disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(12),
      flip({ padding: 10 }),
      shift({ padding: 10 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { move: false, delay: { open: 150, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  if (disabled || !content) return children;

  const side = placement.split('-')[0];
  const staticSide = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[side];
  
  const arrowData = context.middlewareData.arrow;

  return (
    <>
      {isValidElement(children)
        ? cloneElement(children, { ref: refs.setReference, ...getReferenceProps() })
        : <span ref={refs.setReference} {...getReferenceProps()} className="inline-block">{children}</span>
      }

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 9999 }}
              className="pointer-events-none select-none"
              {...getFloatingProps()}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
              <div className="relative px-3 py-1.5 glass-effect bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-white/10 dark:border-slate-200/50">
                <p className="text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap leading-none">
                  {content}
                </p>
                
                {/* Arrow */}
                <div
                  ref={arrowRef}
                  className="absolute w-2.5 h-2.5 bg-slate-900 dark:bg-white rotate-45 border border-white/10 dark:border-slate-200/50"
                  style={{
                    left: arrowData?.x != null ? `${arrowData.x}px` : '',
                    top: arrowData?.y != null ? `${arrowData.y}px` : '',
                    [staticSide]: '-5px',
                    zIndex: -1,
                  }}
                />
              </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
