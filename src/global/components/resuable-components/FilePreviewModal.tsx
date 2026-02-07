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
  const [url, setUrl] = React.useState<string>("");
  const [scale, setScale] = React.useState(1);

  // Create URL with proper cleanup
  React.useEffect(() => {
    if (!file) {
      setUrl("");
      return;
    }
    if (file instanceof File) {
      const blobUrl = URL.createObjectURL(file);
      setUrl(blobUrl);
      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    } else {
      setUrl(file);
    }
  }, [file]);

  // Reset scale when file changes or modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setScale(1);
    }
  }, [isOpen]);

  // Early return AFTER all hooks to satisfy Rules of Hooks
  if (!file) return null;

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setScale(1);

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
        backdrop: "bg-[#0f172a]/80 backdrop-blur-sm",
        wrapper: "p-0 overflow-hidden",
        base: "shadow-none m-0 h-screen w-screen flex flex-col transition-colors duration-300",
        header: "p-0 border-b shrink-0 transition-colors duration-300",
        body: "p-0 flex-1 overflow-hidden transition-colors duration-300",
      }}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
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
                    <h2
                      className="text-[11px] font-black uppercase tracking-[0.2em] leading-none"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Document Preview
                    </h2>
                    <p
                      className="text-[10px] items-center flex gap-2 font-bold mt-2 uppercase tracking-widest truncate max-w-[200px] md:max-w-[400px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: "var(--border-dark)" }}
                      />
                      {name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isImage && (
                    <div
                      className="flex items-center border rounded-lg p-1 mr-2 hidden sm:flex"
                      style={{
                        backgroundColor: "var(--bg-tertiary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <button
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                        className="p-2 hover:text-[#22c55e] rounded-md transition-all disabled:opacity-30"
                        style={{ color: "var(--text-muted)" }}
                        title="Zoom Out"
                      >
                        <ZoomOut size={16} />
                      </button>
                      <div
                        className="w-12 text-center text-[10px] font-black uppercase tracking-tighter"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {Math.round(scale * 100)}%
                      </div>
                      <button
                        onClick={handleZoomIn}
                        disabled={scale >= 4}
                        className="p-2 hover:text-[#22c55e] rounded-md transition-all disabled:opacity-30"
                        style={{ color: "var(--text-muted)" }}
                        title="Zoom In"
                      >
                        <ZoomIn size={16} />
                      </button>
                      <button
                        onClick={handleResetZoom}
                        className="p-2 ml-1 hover:text-[#22c55e] rounded-md transition-all border-l"
                        style={{
                          borderColor: "var(--border-color)",
                          color: "var(--text-muted)",
                        }}
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
                  <div
                    className="w-px h-6 mx-1"
                    style={{ backgroundColor: "var(--border-color)" }}
                  />
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center hover:bg-red-500/10 rounded-xl transition-all"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </ModalHeader>
            <ModalBody
              className={`flex-1 transition-all duration-300 ${
                scale > 1 ? "overflow-auto" : "overflow-hidden"
              }`}
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="min-h-full w-full flex items-center justify-center p-4 md:p-12 relative">
                {isImage ? (
                  <div
                    className="relative transition-transform duration-300 ease-out will-change-transform max-w-full max-h-full flex items-center justify-center"
                    style={{ transform: `scale(${scale})` }}
                  >
                    <img
                      src={url}
                      alt={name}
                      className="max-w-full max-h-[calc(100vh-200px)] w-auto h-auto object-contain rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-8 ring-[var(--bg-primary)] ring-offset-4 ring-offset-[var(--bg-secondary)] animate-in fade-in zoom-in duration-500"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>
                ) : isPdf ? (
                  <div className="flex flex-col items-center gap-6 py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div
                      className="w-32 h-32 rounded-2xl border flex items-center justify-center text-red-500 shadow-xl relative group"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <FileText size={56} />
                      <div
                        className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-black border-4 shadow-lg"
                        style={{ borderColor: "var(--bg-primary)" }}
                      >
                        PDF
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-sm font-black uppercase tracking-widest leading-none"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Protected Document
                      </h3>
                      <p
                        className="text-[10px] font-bold mt-2 uppercase tracking-[0.2em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Click below to view the official PDF content
                      </p>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                      style={{
                        backgroundColor: "var(--text-primary)",
                        color: "var(--bg-primary)",
                      }}
                    >
                      <Eye size={18} />
                      Open Full Document
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 py-20 animate-in fade-in duration-500">
                    <div
                      className="w-24 h-24 rounded-2xl border flex items-center justify-center shadow-inner"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <FileText size={48} />
                    </div>
                    <div className="text-center">
                      <p
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Unsupported Format
                      </p>
                      <p
                        className="text-[10px] font-bold mt-2 uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
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
