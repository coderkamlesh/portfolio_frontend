import html2pdf from "html2pdf.js";

export const generateResumePdf = async () => {
  const element = document.getElementById("resume-root");
  if (!element) return;

  await html2pdf()
    .set({
      margin: 10,
      filename: "Kamlesh_Kumar_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      // ❌ avoid-all REMOVED
      pagebreak: { mode: ["css", "legacy"] },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(element)
    .save();
};
