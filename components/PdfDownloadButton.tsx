"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PdfDownloadButtonProps {
  containerId: string;
  title: string;
  customerName?: string;
}

export function PdfDownloadButton({
  containerId,
  title,
}: PdfDownloadButtonProps) {
  const handleDownload = async () => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

    try {
      const wasHidden = container.classList.contains("hidden");
      if (wasHidden) container.classList.remove("hidden");

      container.style.position = "absolute";
      container.style.left = "-99999px";
      container.style.top = "0";

      await wait(250);

      const pageNodes = Array.from(
        container.querySelectorAll<HTMLElement>(".pdf-title-page, .pdf-page")
      );

      if (pageNodes.length === 0) {
        console.warn("No .pdf-title-page or .pdf-page elements found.");
        return;
      }

      let pdf: jsPDF | null = null;

      for (const node of pageNodes) {
        const canvas = await html2canvas(node, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
        });

        const imgData = canvas.toDataURL("image/png");
        const width = canvas.width;
        const height = canvas.height;
        //const width = 1600;
        //const height = 900;

        if (!pdf) {
          pdf = new jsPDF({
            orientation: width >= height ? "l" : "p",
            unit: "px",
            format: [width, height],
          });
        } else {
          pdf.addPage([width, height], width >= height ? "l" : "p");
        }

        pdf.addImage(imgData, "PNG", 0, 0, width, height);
      }

      if (pdf) {
        const safe = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
        pdf.save(`${safe}.pdf`);
      }
    } catch (err) {
      console.warn("PDF export suppressed:", err);
    } finally {
      const c = document.getElementById(containerId);
      if (!c) return;

      c.classList.add("hidden");
      c.style.position = "";
      c.style.left = "";
      c.style.top = "";
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="rounded-full bg-white/10 text-xs text-black px-3 py-1.5 hover:bg-white/80 transition font-medium"
    >
      Download PDF
    </button>
  );
}
