/*
 * GOOGLE APPS SCRIPT RSVP
 * 1. Buat Google Spreadsheet dengan kolom: Timestamp | Name | Attendance | Total Pax
 * 2. Extensions > Apps Script, tempel seluruh kode ini.
 * 3. Isi SPREADSHEET_ID dengan ID spreadsheet (bagian di antara /d/ dan /edit).
 * 4. Deploy > New deployment > Web app; Execute as: Me; Who has access: Anyone.
 * 5. Salin URL /exec ke WEDDING.appsScriptUrl pada script.js.
 */
const SPREADSHEET_ID = "PASTE_SPREADSHEET_ID_HERE";
const SHEET_NAME = "RSVP";

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Attendance", "Total Pax"]);
    sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = e.parameter || {};
    const name = String(data.name || "").trim();
    const attendance = String(data.attendance || "");
    const pax = Number(data.pax);
    if (!name) throw new Error("Nama wajib diisi.");
    if (!["Yes", "No"].includes(attendance)) throw new Error("Pilihan kehadiran tidak valid.");
    if (![1, 2, 3].includes(pax)) throw new Error("Jumlah tamu tidak valid.");
    getSheet_().appendRow([new Date(), name, attendance, pax]);
    return ContentService.createTextOutput(JSON.stringify({success:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success:false, error:err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("RSVP endpoint is ready.")
    .setMimeType(ContentService.MimeType.TEXT);
}
