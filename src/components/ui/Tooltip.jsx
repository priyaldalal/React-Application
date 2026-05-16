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

/**
 * Portal-based Tooltip — renders outside the DOM tree.
 * Immune to overflow:hidden clipping in sidebar/navbar.
 *
 * Props:
 *   position  — 'top' | 'bottom' | 'left' | 'right'
 *   disabled  — skip rendering tooltip entirely
 *   content   — tooltip text
 */
const Tooltip = ({ children, content, position = 'right', disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ fallbackAxisSideDirection: 'start' }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { move: false, delay: { open: 150, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  if (disabled) return children;

  // Determine which side the arrow sits on (opposite of tooltip placement)
  const side = placement.split('-')[0];
  const arrowSide = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[side];

  return (
    <>
      {isValidElement(children)
        ? cloneElement(children, { ref: refs.setReference, ...getReferenceProps() })
        : <span ref={refs.setReference} {...getReferenceProps()}>{children}</span>
      }

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.1 }}
              className="z-[9999] px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[8px] font-bold rounded-md shadow-lg whitespace-nowrap"
              {...getFloatingProps()}
            >
              {content}
              <div
                ref={arrowRef}
                className="absolute w-1.5 h-1.5 bg-slate-900 dark:bg-slate-100 rotate-45"
                style={{ [arrowSide]: '-3px' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
