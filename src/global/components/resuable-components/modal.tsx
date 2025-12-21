import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

interface ResuableModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  backdrop?: "opaque" | "blur" | "transparent";
  scrollBehavior?: "normal" | "inside" | "outside";
  placement?:
    | "auto"
    | "top"
    | "bottom"
    | "center"
    | "top-center"
    | "bottom-center";
  hideCloseButton?: boolean;
}

const ResuableModal: React.FC<ResuableModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  icon,
  children,
  footer,
  size = "md",
  backdrop = "blur",
  scrollBehavior = "inside",
  placement = "center",
  hideCloseButton = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      backdrop={backdrop}
      scrollBehavior={scrollBehavior}
      placement={placement}
      hideCloseButton={hideCloseButton}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      classNames={{
        backdrop: "bg-black/40 backdrop-blur-sm backdrop-saturate-150",
        base: "border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-2xl",
        header: "border-b border-gray-100 dark:border-gray-800",
        footer: "border-t border-gray-100 dark:border-gray-800",
        closeButton: "hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all",
        body: "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {(title || icon) && (
              <ModalHeader className="flex flex-row items-center gap-3 py-5 px-6">
                {icon && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30">
                    <div className="flex items-center justify-center w-6 h-6">
                      {icon}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h2>
                </div>
              </ModalHeader>
            )}
            <ModalBody className="py-6 px-6">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
              </div>
            </ModalBody>
            {footer && (
              <ModalFooter className="flex justify-end gap-2 py-4 px-6 bg-gray-50/50 dark:bg-gray-900/50">
                {footer}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResuableModal;