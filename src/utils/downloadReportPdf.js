import { jsPDF } from "jspdf";

const downloadBlob = (blob, filename) => {
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
};

const imageBlobToPdf = async (imageBlob) => {
    const imageUrl = URL.createObjectURL(imageBlob);
    const image = new Image();

    try {
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = () => reject(new Error("The report image could not be opened."));
            image.src = imageUrl;
        });

        const maxDimension = 2200;
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not prepare the report image for PDF conversion.");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const orientation = canvas.width > canvas.height ? "landscape" : "portrait";
        const pdf = new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const fitScale = Math.min(
            (pageWidth - margin * 2) / canvas.width,
            (pageHeight - margin * 2) / canvas.height
        );
        const imageWidth = canvas.width * fitScale;
        const imageHeight = canvas.height * fitScale;
        const x = (pageWidth - imageWidth) / 2;
        const y = (pageHeight - imageHeight) / 2;

        pdf.addImage(canvas.toDataURL("image/jpeg", 0.94), "JPEG", x, y, imageWidth, imageHeight);
        return pdf.output("blob");
    } finally {
        URL.revokeObjectURL(imageUrl);
    }
};

export default async function downloadReportPdf(sourceUrl, filename) {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
        throw new Error(`Report download failed (${response.status}).`);
    }

    const sourceBlob = await response.blob();
    const isPdf = sourceBlob.type === "application/pdf" || /\.pdf(?:$|[?#])/i.test(sourceUrl);
    const pdfBlob = isPdf ? sourceBlob : await imageBlobToPdf(sourceBlob);
    downloadBlob(pdfBlob, filename);
}
