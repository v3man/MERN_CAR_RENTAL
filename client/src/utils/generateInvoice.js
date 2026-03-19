import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

/**
 * Generates a professional PDF invoice for a booking.
 */
export const generateInvoice = (booking, car) => {
  try {
    if (!booking || !car) {
      console.error("Missing booking or car data", { booking, car });
      return;
    }

    const doc = new jsPDF();
    const invoiceNumber = `INV-${(booking._id || "000000").slice(-6).toUpperCase()}`;
    const today = format(new Date(), "PP");

    // Colors
    const primaryColor = [79, 70, 229]; // #4F46E5

    // Header - Company Info
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("FIRST CLASS RENTALS", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text("123 Luxury Drive, Beverly Hills, CA 90210", 14, 26);
    doc.text("support@firstclassrentals.com | +1 (800) 123-4567", 14, 31);

    // Invoice Label
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text("INVOICE", 14, 45);
    
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(`Invoice Number: ${invoiceNumber}`, 14, 51);
    doc.text(`Date Issued: ${today}`, 14, 56);

    // Horizontal Line
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 62, 196, 62);

    // Booking details Section
    doc.setFontSize(12);
    doc.setTextColor(31, 41, 55);
    doc.text("Booking Details", 14, 75);

    const pickup = format(new Date(booking.pickupDate), "PP");
    const returnD = format(new Date(booking.returnDate), "PP");

    autoTable(doc, {
      startY: 80,
      head: [["Description", "Details"]],
      body: [
        ["Vehicle", `${car?.brand || ""} ${car?.model || "Car"} (${car?.year || "N/A"})`],
        ["Pickup Date", pickup],
        ["Return Date", returnD],
        ["Location", car?.location || "Main Office"],
        ["Status", (booking.status || "confirmed").toUpperCase()],
      ],
      theme: "striped",
      headStyles: { fillColor: primaryColor },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // Pricing Section
    const days = Math.ceil(
      (new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24)
    ) || 1;

    doc.setFontSize(12);
    doc.setTextColor(31, 41, 55);
    doc.text("Payment Summary", 14, doc.lastAutoTable.finalY + 15);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Item", "Quantity", "Rate", "Total"]],
      body: [
        [`Car Rental (${car?.brand || ""} ${car?.model || ""})`, `${days} Days`, `$${car?.pricePerDay || 0}`, `$${booking.totalPrice || 0}`],
      ],
      foot: [
        ["", "", "GRAND TOTAL", `$${booking.totalPrice || 0}`],
      ],
      theme: "grid",
      headStyles: { fillColor: primaryColor },
      footStyles: { fillColor: [243, 244, 246], textColor: [31, 41, 55], fontStyle: "bold" },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // Footer / Thank You
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text("Thank you for choosing First Class Rentals!", 14, finalY + 20);
    doc.text("Safe travels and enjoy your ride.", 14, finalY + 25);

    // Save the PDF
    doc.save(`Invoice_${invoiceNumber}.pdf`);
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    alert("Could not generate invoice. Check console for details.");
  }
};
