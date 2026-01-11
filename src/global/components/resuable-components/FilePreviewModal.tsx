import React from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/react";
import {
  X,
  Eye,
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

interface FilePreviewModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  file: File | string | null;
  fileName?: string;
  fileType?: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onOpenChange,
  file,
  fileName,
  fileType,
}) => {
  const [scale, setScale] = React.useState(1);

  // Memoize the URL and handle memory cleanup
  const url = React.useMemo(() => {
    if (!file) return "";
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file;
  }, [file]);

  // Cleanup blob URLs to prevent memory leaks and potential blank pages
  React.useEffect(() => {
    return () => {
      if (url && url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  if (!file) return null;

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setScale(1);

  // Reset scale when file changes or modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setScale(1);
    }
  }, [isOpen]);

  const getFileType = () => {
    if (fileType) return fileType;
    if (file instanceof File) return file.type;
    // Guess from string extension
    if (typeof file === "string") {
      const ext = file.split(".").pop()?.toLowerCase();
      if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || ""))
        return "image";
      if (ext === "pdf") return "application/pdf";
    }
    return "unknown";
  };

  const isImage = getFileType().startsWith("image");
  const isPdf = getFileType() === "application/pdf";
  const name =
    fileName || (file instanceof File ? file.name : "Document Preview");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      radius="none"
      backdrop="blur"
      hideCloseButton={true}
      classNames={{
        backdrop: "bg-slate-900/60 backdrop-blur-sm",
        wrapper: "p-0 overflow-hidden",
        base: "bg-white shadow-none m-0 h-screen w-screen flex flex-col",
        header: "p-0 border-b border-slate-100 shrink-0",
        body: "p-0 flex-1 overflow-hidden",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-0">
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] shadow-sm">
                    <Eye size={20} />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 leading-none">
                      Document Preview
                    </h2>
                    <p className="text-[10px] items-center flex gap-2 font-bold text-slate-400 mt-2 uppercase tracking-widest truncate max-w-[200px] md:max-w-[400px]">
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      {name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isImage && (
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-1 mr-2 hidden sm:flex">
                      <button
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                        className="p-2 hover:bg-white hover:text-[#22c55e] rounded-md transition-all disabled:opacity-30 disabled:hover:text-slate-400"
                        title="Zoom Out"
                      >
                        <ZoomOut size={16} />
                      </button>
                      <div className="w-12 text-center text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        {Math.round(scale * 100)}%
                      </div>
                      <button
                        onClick={handleZoomIn}
                        disabled={scale >= 4}
                        className="p-2 hover:bg-white hover:text-[#22c55e] rounded-md transition-all disabled:opacity-30 disabled:hover:text-slate-400"
                        title="Zoom In"
                      >
                        <ZoomIn size={16} />
                      </button>
                      <button
                        onClick={handleResetZoom}
                        className="p-2 ml-1 hover:bg-white hover:text-[#22c55e] rounded-md transition-all border-l border-slate-100"
                        title="Reset Zoom"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  )}

                  <a
                    href={url}
                    download={name}
                    className="flex items-center gap-2.5 px-4 py-2 bg-[#22c55e] hover:bg-[#1ea34a] !text-white rounded-lg transition-all group shadow-lg shadow-[#22c55e]/20"
                    title="Download File"
                  >
                    <Download
                      size={16}
                      className="group-hover:translate-y-0.5 transition-transform"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">
                      Download
                    </span>
                  </a>
                  <div className="w-px h-6 bg-slate-100 mx-1" />
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </ModalHeader>
            <ModalBody
              className={`flex-1 bg-[#0f172a]/5 transition-all duration-300 ${
                scale > 1 ? "overflow-auto" : "overflow-hidden"
              }`}
            >
              <div className="min-h-full w-full flex items-center justify-center p-4 md:p-12 relative">
                {isImage ? (
                  <div
                    className="relative transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `scale(${scale})` }}
                  >
                    <img
                      src={url}
                      alt={name}
                      className="max-w-full max-h-full object-contain rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-8 ring-white animate-in fade-in zoom-in duration-500"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                  </div>
                ) : isPdf ? (
                  <div className="flex flex-col items-center gap-6 py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-32 h-32 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-red-500 shadow-xl relative group">
                      <FileText size={56} />
                      <div className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-black border-4 border-white shadow-lg">
                        PDF
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">
                        Protected Document
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">
                        Click below to view the official PDF content
                      </p>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Eye size={18} />
                      Open Full Document
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 py-20 animate-in fade-in duration-500">
                    <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-200 shadow-inner">
                      <FileText size={48} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                        Unsupported Format
                      </p>
                      <p className="text-[10px] font-bold text-slate-300 mt-2 uppercase tracking-widest">
                        Download to view on your device
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FilePreviewModal;
