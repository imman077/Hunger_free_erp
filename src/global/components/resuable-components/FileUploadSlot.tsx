import React, { useRef, useState } from "react";
import {
  UploadCloud,
  CheckCircle,
  X,
  Eye,
  ShieldCheck,
  FileText,
  Download,
} from "lucide-react";
import FilePreviewModal from "./FilePreviewModal";

interface FileUploadSlotProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  mandatory?: boolean;
  accept?: string;
  subtitle?: string;
  icon?: "shield" | "file";
  showActions?: boolean; // Show view/download buttons
}

const FileUploadSlot: React.FC<FileUploadSlotProps> = ({
  label,
  value,
  onChange,
  mandatory = false,
  accept = ".pdf,.jpg,.jpeg,.png",
  subtitle,
  icon = "file",
  showActions = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleSlotClick = () => {
    if (!value && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
    if (e.target) e.target.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreviewOpen(true);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value && downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = value.name;
      link.click();
    }
  };

  const isImage = value?.type?.startsWith("image/");

  // Create download URL and cleanup
  React.useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setDownloadUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setDownloadUrl(null);
      };
    } else {
      setDownloadUrl(null);
    }
  }, [value]);

  return (
    <>
      <div
        onClick={handleSlotClick}
        className={`relative border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-all duration-300 min-h-[160px] group ${
          value
            ? "border-[#22c55e] bg-[#22c55e]/10 shadow-inner"
            : "border-slate-200 bg-slate-50/50 hover:border-[#22c55e]/50 hover:bg-white cursor-pointer"
        }`}
      >
        {/* Background Preview for Images */}
        {value && isImage && downloadUrl && (
          <div
            className="absolute inset-2 rounded bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"
            style={{ backgroundImage: `url(${downloadUrl})` }}
          />
        )}

        {/* Content */}
        <div
          className={`relative z-10 w-12 h-12 rounded-md flex items-center justify-center mb-4 transition-all duration-500 ${
            value
              ? "bg-[#22c55e] text-white shadow-lg shadow-[#22c55e]/20"
              : "bg-white text-slate-300 group-hover:text-[#22c55e] shadow-sm"
          }`}
        >
          {value ? (
            icon === "shield" ? (
              <ShieldCheck size={24} />
            ) : (
              <FileText size={24} />
            )
          ) : (
            <UploadCloud size={24} />
          )}
        </div>

        <div className="relative z-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-tight text-slate-800">
            {label} {mandatory && <span className="text-red-500">*</span>}
          </p>
          <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none truncate max-w-[140px] mx-auto">
            {value
              ? value.name
              : subtitle || (mandatory ? "Mandatory" : "Optional")}
          </p>
        </div>

        {/* Actions Overlay when filled */}
        {value && showActions && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
            <button
              type="button"
              onClick={handleView}
              className="p-1.5 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-[#22c55e] hover:border-[#22c55e]/30 shadow-sm transition-all"
              title="Preview File"
            >
              <Eye size={12} />
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="p-1.5 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-blue-500 hover:border-blue-200 shadow-sm transition-all"
              title="Download File"
            >
              <Download size={12} />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-red-600 hover:border-red-200 shadow-sm transition-all"
              title="Remove File"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Actions Overlay when filled (no actions mode) */}
        {value && !showActions && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-red-600 hover:border-red-200 shadow-sm transition-all"
              title="Remove File"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Success Indicator */}
        {value && (
          <div className="absolute bottom-2 right-2 text-[#22c55e] animate-in zoom-in duration-300">
            <CheckCircle size={14} />
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
        />
      </div>

      <FilePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={value}
      />
    </>
  );
};

export default FileUploadSlot;
