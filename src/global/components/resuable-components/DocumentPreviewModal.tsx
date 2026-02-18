import React from "react";
import { createPortal } from "react-dom";
import { X, Download, FileText, ZoomIn, ZoomOut } from "lucide-react";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  documentType: string;
  issuer?: string;
  issuedDate?: string;
  /** Optional URL to a real file. If omitted, a mock PDF placeholder is shown. */
  fileUrl?: string;
}

// Inline SVG check-circle for the stamp seal
const CheckCircle = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  documentName,
  documentType,
  issuer = "Government of India",
  issuedDate = "Jan 2026",
  fileUrl,
}) => {
  const [zoom, setZoom] = React.useState(100);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (fileUrl) {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = `${documentName.replace(/\s+/g, "_")}.pdf`;
      a.click();
      return;
    }

    // Generate a minimal mock PDF blob for demo purposes
    const pdfContent = `%PDF-1.4
1 0 obj<</Type /Catalog /Pages 2 0 R>>endobj
2 0 obj<</Type /Pages /Kids [3 0 R] /Count 1>>endobj
3 0 obj<</Type /Page /Parent 2 0 R /MediaBox [0 0 595 842]
/Contents 4 0 R /Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 120>>stream
BT /F1 18 Tf 72 750 Td (${documentName}) Tj
0 -30 Td /F1 12 Tf (Type: ${documentType}) Tj
0 -20 Td (Issuer: ${issuer}) Tj
0 -20 Td (Date: ${issuedDate}) Tj ET
endstream endobj
5 0 obj<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>endobj
xref 0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000274 00000 n
0000000446 00000 n
trailer<</Size 6 /Root 1 0 R>>
startxref 535
%%EOF`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentName.replace(/\s+/g, "_")}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // A4 dimensions in px at 96dpi
  const A4_W = 595;
  const A4_H = 842;
  const scale = zoom / 100;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* ── Header toolbar ── */}
      <div
        className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b shrink-0"
        style={{ borderColor: "var(--border-color)" }}
      >
        {/* Doc info */}
        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-hf-green/10 border border-hf-green/20 flex items-center justify-center shrink-0">
            <FileText size={14} className="text-hf-green md:w-4 md:h-4" />
          </div>
          <div className="min-w-0">
            <p
              className="text-xs md:text-sm font-black uppercase tracking-tight truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {documentName}
            </p>
            <p
              className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] opacity-40 truncate"
              style={{ color: "var(--text-secondary)" }}
            >
              {documentType} · {issuer}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          {/* Zoom Level / Controls - hidden on very small mobile */}
          <div className="hidden sm:flex items-center gap-1.5 md:gap-2">
            {/* Zoom Out */}
            <button
              onClick={() => setZoom((z) => Math.max(25, z - 25))}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg border flex items-center justify-center hover:bg-slate-500/10 transition-colors cursor-pointer"
              style={{ borderColor: "var(--border-color)" }}
              title="Zoom Out"
            >
              <ZoomOut
                size={12}
                className="md:w-[14px] md:h-[14px]"
                style={{ color: "var(--text-secondary)" }}
              />
            </button>

            {/* Zoom level */}
            <span
              className="text-[9px] md:text-[10px] font-black w-10 md:w-12 text-center tabular-nums"
              style={{ color: "var(--text-secondary)" }}
            >
              {zoom}%
            </span>

            {/* Zoom In */}
            <button
              onClick={() => setZoom((z) => Math.min(300, z + 25))}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg border flex items-center justify-center hover:bg-slate-500/10 transition-colors cursor-pointer"
              style={{ borderColor: "var(--border-color)" }}
              title="Zoom In"
            >
              <ZoomIn
                size={12}
                className="md:w-[14px] md:h-[14px]"
                style={{ color: "var(--text-secondary)" }}
              />
            </button>
          </div>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:gap-2 md:px-4 md:py-2 bg-hf-green text-white rounded-xl font-black uppercase tracking-[0.15em] text-[9px] hover:bg-emerald-600 transition-colors shadow-lg shadow-hf-green/20 cursor-pointer"
          >
            <Download size={13} />
            <span className="hidden md:inline">Download</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-8 md:h-8 rounded-lg border flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-colors cursor-pointer"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── Scrollable document canvas ── */}
      <div
        className="flex-1 overflow-auto"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        {/*
          The trick for correct zoom:
          - The inner div is always exactly A4_W × A4_H px (real pixels)
          - CSS transform: scale(zoom) visually scales it
          - The outer "sizer" div is scaled dimensions so the scrollable area
            grows/shrinks correctly and the document doesn't overlap the edges
        */}
        <div
          style={{
            width: `${A4_W * scale}px`,
            height: `${A4_H * scale}px`,
            margin: "40px auto",
          }}
        >
          <div
            className="shadow-2xl rounded-2xl overflow-hidden"
            style={{
              width: `${A4_W}px`,
              height: `${A4_H}px`,
              backgroundColor: "#ffffff",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* ── Document content ── */}
            <div className="p-10 h-full flex flex-col">
              {/* Header row */}
              <div className="flex items-center justify-between pb-6 border-b-2 border-gray-200 mb-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-2">
                    <FileText size={24} className="text-emerald-600" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {issuer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Issued Date
                  </p>
                  <p className="text-sm font-black text-gray-700">
                    {issuedDate}
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-1">
                  {documentName}
                </h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {documentType}
                </p>
              </div>

              {/* Body text */}
              <div className="space-y-3 flex-1">
                {[
                  "This is an official document from the government or a verified authority.",
                  "It proves that this organization is legally registered and allowed to operate.",
                  "",
                  "We have checked this document to make sure everything is correct.",
                  "It helps us know that the entity is safe and follows all the rules.",
                  "",
                  "Reference No: REF-2026-HF-" +
                    Math.floor(Math.random() * 90000 + 10000),
                  "Status: ACTIVE & VERIFIED",
                ].map((line, i) =>
                  line === "" ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <p
                      key={i}
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      {line}
                    </p>
                  ),
                )}

                {/* Redacted fields */}
                <div className="mt-8 space-y-3">
                  {[
                    "Entity Name",
                    "Registration Number",
                    "Valid Until",
                    "Issuing Officer",
                  ].map((label) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-40">
                        {label}
                      </span>
                      <div className="h-3 bg-gray-200 rounded flex-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stamp / seal */}
              <div className="mt-10 pt-6 border-t-2 border-gray-200 flex items-end justify-between">
                <div>
                  <div className="w-20 h-0.5 bg-gray-400 mb-1" />
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Authorized Signature
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-emerald-200 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="px-6 py-3 border-t flex items-center justify-between shrink-0"
        style={{ borderColor: "var(--border-color)" }}
      >
        <p
          className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30"
          style={{ color: "var(--text-secondary)" }}
        >
          Document is for verification purposes only · HungerFree ERP
        </p>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-hf-green hover:underline underline-offset-4 cursor-pointer"
        >
          <Download size={11} /> Save as PDF
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default DocumentPreviewModal;
