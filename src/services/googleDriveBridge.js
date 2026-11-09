/**
 * Google Drive & Apps Script Integration Bridge
 * Connects the Teaching File Quality Auditor to Google Drive and Google Sheets
 */

export function extractDriveFolderId(urlOrId) {
  if (!urlOrId) return '';
  const clean = urlOrId.trim();
  // If already an ID
  if (!clean.includes('/') && clean.length > 15) return clean;

  // From URL e.g. https://drive.google.com/drive/folders/1JwFjnGtv_vlHhuC3U5zOAgppdc6S3a0V1ji
  const match = clean.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];

  // From URL e.g. https://drive.google.com/open?id=1JwFjnGtv...
  const matchId = clean.match(/id=([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];

  return clean;
}

export function buildDriveFolderUrl(folderId) {
  if (!folderId) return 'https://drive.google.com';
  return `https://drive.google.com/drive/folders/${folderId}`;
}

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `/**
 * EduAudit Pro 2026 - Google Apps Script Drive Bridge
 * Automatically structures and manages Teaching File Folders in Google Drive
 * 
 * INSTRUCTIONS FOR NON-CODERS:
 * 1. Open Google Drive (drive.google.com).
 * 2. Create a new Google Sheet named "EduAudit Teaching Files 2026".
 * 3. In the top menu, click Extensions -> Apps Script.
 * 4. Select all and paste this entire code.
 * 5. Click the "Save" icon, then click "Deploy" -> "New deployment".
 * 6. Under "Select type", choose "Web app".
 * 7. Set "Execute as" to "Me" and "Who has access" to "Anyone".
 * 8. Click "Deploy" and authorize permissions.
 * 9. Copy the generated Web App URL and paste it into the EduAudit Pro App!
 */

var TEACHING_FOLDERS = [
  "01 Course Syllabus & Course Outline",
  "02 Time Table",
  "03 Continuous Assessment Plan",
  "04 List of References",
  "05 Student Attendance List",
  "06 Student Course Evaluation Report",
  "07 Report by Lecturer",
  "08 Teaching Materials",
  "09 Moderated Final Exam with Marking Scheme",
  "10 Final Exam Scripts (3 higher, 3 lower, and 3 middle scores)",
  "11 Coursework with Marking Schemes",
  "12 Samples of Student Coursework (3 high, 3 mid, 3 low)",
  "13 Miscellaneous Records"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    var payload = data.payload;

    if (action === "createTeachingFileFolder") {
      var root = DriveApp.createFolder(payload.courseCode + " - " + payload.courseName);
      var subfolderMap = {};

      for (var i = 0; i < TEACHING_FOLDERS.length; i++) {
        var sub = root.createFolder(TEACHING_FOLDERS[i]);
        subfolderMap[TEACHING_FOLDERS[i]] = sub.getUrl();
      }

      root.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        folderUrl: root.getUrl(),
        folderId: root.getId(),
        subfolders: subfolderMap
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "syncAuditResults") {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName("AuditLog") || ss.insertSheet("AuditLog");
      
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Timestamp", "Course Code", "Course Name", "Lecturer", "Compliance %", "Quality Score", "Tier", "Auditor Name"]);
        sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
      }

      sheet.appendRow([
        new Date().toISOString(),
        payload.code,
        payload.name,
        payload.lecturer,
        payload.complianceRate + "%",
        payload.overallQualityIndex + "%",
        payload.qualityTier,
        payload.auditorName
      ]);

      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Audit synced to Google Sheet" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "online", system: "EduAudit Drive Bridge 2026" }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
