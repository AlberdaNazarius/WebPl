import React, { useState, useRef, useEffect } from 'react';

interface RightClickModalProps {
  children: React.ReactNode;
  menuContent?: React.ReactNode;
  onOpen?: (position: { x: number; y: number }) => void;
  onClose?: () => void;
  className?: string;
  menuClassName?: string;
  backdropClassName?: string;
  disabled?: boolean;
}

const RightClickModal: React.FC<RightClickModalProps> = (
  {
    children,
    menuContent = (
      <div className="bg-white shadow-lg rounded-md p-4 border border-gray-300">
        <h3 className="font-bold mb-2">Custom Menu</h3>
        <ul className="space-y-2">
          <li>
            <button className="hover:bg-gray-100 w-full text-left p-1">Option 1</button>
          </li>
          <li>
            <button className="hover:bg-gray-100 w-full text-left p-1">Option 2</button>
          </li>
          <li>
            <button className="hover:bg-gray-100 w-full text-left p-1">Option 3</button>
          </li>
        </ul>
      </div>
    ),
    onOpen,
    onClose,
    className = '',
    menuClassName = '',
    backdropClassName = 'fixed inset-0 z-[999]',
    disabled = false,
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disabled) return;

    e.preventDefault();

    const clickPosition = {
      x: e.clientX,
      y: e.clientY,
    };

    setPosition(clickPosition);
    setIsOpen(true);
    onOpen?.(clickPosition);
  };

  const closeMenu = () => {
    setIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('contextmenu', closeMenu);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('contextmenu', closeMenu);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const adjustedPosition = { ...position };

      if (position.x + rect.width > window.innerWidth) {
        adjustedPosition.x = window.innerWidth - rect.width - 10;
      }
      if (position.y + rect.height > window.innerHeight) {
        adjustedPosition.y = window.innerHeight - rect.height - 10;
      }

      if (adjustedPosition.x !== position.x || adjustedPosition.y !== position.y) {
        setPosition(adjustedPosition);
      }
    }
  }, [isOpen, position]);

  return (
    <div
      className={`relative ${className}`}
      onContextMenu={handleContextMenu}
    >
      {children}

      {isOpen && (
        <>
          <div className={backdropClassName} />
          <div
            ref={menuRef}
            className={`fixed z-[1000] ${menuClassName}`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {menuContent}
          </div>
        </>
      )}
    </div>
  );
};

export default RightClickModal;