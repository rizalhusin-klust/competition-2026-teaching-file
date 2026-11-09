/**
 * Google Sheets Database & Sync Service
 * Allows user to store and retrieve all course data, folder links, scores, and findings in their own Google Sheet.
 */

const GSHEET_CONFIG_KEY = 'eduaudit_gsheet_config_2026';

export function getStoredGSheetConfig() {
  try {
    const raw = localStorage.getItem(GSHEET_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading Google Sheets config', e);
  }
  return {
    webAppUrl: '',
    spreadsheetUrl: '',
    autoSync: false,
    lastSyncedAt: null
  };
}

export function saveStoredGSheetConfig(config) {
  try {
    localStorage.setItem(GSHEET_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving Google Sheets config', e);
  }
}

/**
 * Sync all course data, metadata, 13 folder links, and auditor remarks to the user's Google Sheet
 */
export async function syncCourseToGoogleSheet(course, webAppUrl) {
  if (!webAppUrl || !webAppUrl.trim()) {
    throw new Error('Google Apps Script Web App URL is required.');
  }

  const endpoint = webAppUrl.trim();

  // Prepare a clean comprehensive payload
  const payload = {
    action: 'syncFullCourse',
    course: {
      id: course.id,
      code: course.code,
      name: course.name,
      program: course.program,
      semester: course.semester,
      lecturer: course.lecturer,
      headOfDepartment: course.headOfDepartment,
      auditorName: course.auditorName,
      creditHours: course.creditHours,
      auditDate: course.auditDate,
      auditStatus: course.auditStatus,
      overallQualityIndex: course.overallQualityIndex || 0,
      complianceRate: course.complianceRate || 0,
      driveFolderUrl: course.driveFolderUrl || '',
      folderAudits: course.folderAudits || {},
      clos: course.clos || [],
      studentMetrics: course.studentMetrics || {}
    },
    timestamp: new Date().toISOString()
  };

  // Google Apps Script redirects with 302, mode: 'no-cors' works for blind POST or standard fetch if CORS set
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8' // text/plain prevents CORS preflight issues with Google Apps Script
    },
    body: JSON.stringify(payload)
  });

  return { success: true };
}

/**
 * Fetch all courses from the user's Google Sheet
 */
export async function loadCoursesFromGoogleSheet(webAppUrl) {
  if (!webAppUrl || !webAppUrl.trim()) {
    throw new Error('Google Apps Script Web App URL is required.');
  }

  const endpoint = webAppUrl.trim() + (webAppUrl.includes('?') ? '&' : '?') + 'action=getAllCourses';
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch from Google Sheet: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.status === 'success' && Array.isArray(data.courses)) {
    return data.courses;
  }
  throw new Error(data.message || 'Invalid response from Google Sheets Web App');
}

/**
 * Ready-to-paste Google Apps Script code for the user's Google Sheet
 */
export const GSHEET_DATABASE_APPS_SCRIPT = `/**
 * EduAudit Pro 2026 - Google Sheets Database & Drive Bridge
 * Author: EduAudit Pro / FABE+ADQAD
 * 
 * Instructions:
 * 1. Open Google Sheets (sheets.google.com) -> Create a Blank Spreadsheet.
 * 2. Rename it to e.g. "EduAudit Pro - Teaching Files Database 2026".
 * 3. In the top menu, click Extensions -> Apps Script.
 * 4. Erase everything in Code.gs and PASTE THIS ENTIRE SCRIPT.
 * 5. Click the "Save" icon (Floppy disk).
 * 6. Click "Deploy" (top right) -> "New deployment".
 * 7. Click the gear icon (Select type) -> choose "Web app".
 * 8. Set:
 *    - Description: "EduAudit DB v1"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (allows your web app to save to the sheet)
 * 9. Click "Deploy", click "Authorize access", choose your Google account, 
 *    click "Advanced" -> "Go to (unsafe)" -> "Allow".
 * 10. Copy the Web app URL (ends with /exec) and paste it into EduAudit Pro!
 */

function doPost(e) {
  try {
    var raw = e.postData.contents;
    var data = JSON.parse(raw);
    var action = data.action;

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "syncFullCourse" || action === "saveCourse") {
      var course = data.course;
      saveCourseToSheet(ss, course);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Course " + course.code + " successfully saved in Google Sheet"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unknown action"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("CoursesDatabase");
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        courses: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var values = sheet.getDataRange().getValues();
    var courses = [];

    // Row 0 is headers
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      var rawJson = row[12]; // Column M contains full JSON
      if (rawJson) {
        try {
          var parsed = JSON.parse(rawJson);
          courses.push(parsed);
        } catch (pe) {
          // Fallback minimal object
          courses.push({
            id: row[0],
            code: row[1],
            name: row[2],
            lecturer: row[3],
            auditorName: row[4],
            headOfDepartment: row[5],
            semester: row[6],
            driveFolderUrl: row[7]
          });
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      courses: courses
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function saveCourseToSheet(ss, course) {
  // 1. Master Courses Database Sheet
  var masterSheet = ss.getSheetByName("CoursesDatabase") || ss.insertSheet("CoursesDatabase");
  
  if (masterSheet.getLastRow() === 0) {
    masterSheet.appendRow([
      "Course ID",
      "Course Code",
      "Course Title",
      "Lecturer",
      "Auditor",
      "Head of Department (HOD)",
      "Semester / Session",
      "Overall Quality %",
      "Compliance Rate %",
      "Drive Folder Link",
      "Audit Status",
      "Last Synced",
      "Full JSON Payload"
    ]);
    masterSheet.getRange(1, 1, 1, 13).setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
    masterSheet.setFrozenRows(1);
  }

  // Find if course already exists to update row
  var data = masterSheet.getDataRange().getValues();
  var rowIndex = -1;
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === course.id || data[i][1] === course.code) {
      rowIndex = i + 1;
      break;
    }
  }

  var rowValues = [
    course.id || "",
    course.code || "",
    course.name || "",
    course.lecturer || "",
    course.auditorName || "",
    course.headOfDepartment || "",
    course.semester || "",
    (course.overallQualityIndex || 0) + "%",
    (course.complianceRate || 0) + "%",
    course.driveFolderUrl || "",
    course.auditStatus || "In Progress",
    new Date().toLocaleString(),
    JSON.stringify(course)
  ];

  if (rowIndex > 0) {
    masterSheet.getRange(rowIndex, 1, 1, 13).setValues([rowValues]);
  } else {
    masterSheet.appendRow(rowValues);
  }

  // 2. Folder Detail Breakdown Sheet (13 Teaching File Items & Links)
  var detailsSheet = ss.getSheetByName("TeachingFilesBreakdown") || ss.insertSheet("TeachingFilesBreakdown");
  if (detailsSheet.getLastRow() === 0) {
    detailsSheet.appendRow([
      "Course Code",
      "Course Title",
      "Folder No.",
      "Folder Name",
      "Submitted (Y/N)",
      "File Count",
      "Score (1-5)",
      "Tier",
      "Auditor Feedback / Notes",
      "File Names & Drive Links",
      "Last Updated"
    ]);
    detailsSheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#0f766e").setFontColor("#ffffff");
    detailsSheet.setFrozenRows(1);
  }

  // Remove previous rows for this course code in TeachingFilesBreakdown
  var dData = detailsSheet.getDataRange().getValues();
  for (var d = dData.length - 1; d >= 1; d--) {
    if (dData[d][0] === course.code) {
      detailsSheet.deleteRow(d + 1);
    }
  }

  var folders = course.folderAudits || {};
  var folderKeys = Object.keys(folders).sort();

  var folderTitles = {
    "00": "00 TEACHING FILE COVER PAGE",
    "01": "01 DETAILS OF STUDENTS' RESULTS",
    "02": "02 OBE ASSESSMENT",
    "03": "03 COURSE SYLLABUS",
    "04": "04 TEACHING PLAN",
    "05": "05 TIME TABLE OF LECTURER",
    "06": "06 STUDENT MONTHLY ATTENDANCE",
    "07": "07 REPORT BY LECTURER",
    "08": "08 TEACHING MATERIALS",
    "09": "09 MODERATE FINAL EXAM WITH MARKING SCHEME",
    "10": "10 FINAL EXAM SCRIPTS",
    "11": "11 COURSEWORK WITH MARKING SCHEME",
    "12": "12 SAMPLES OF STUDENTS WORK",
    "13": "13 MISCELLANEOUS RECORDS"
  };

  for (var f = 0; f < folderKeys.length; f++) {
    var fid = folderKeys[f];
    var item = folders[fid] || {};
    var fileSummary = "";
    if (item.files && item.files.length > 0) {
      fileSummary = item.files.map(function(fl) {
        return fl.name + (fl.driveLink ? " (" + fl.driveLink + ")" : "");
      }).join("\\n");
    }

    detailsSheet.appendRow([
      course.code,
      course.name,
      fid,
      folderTitles[fid] || ("Folder " + fid),
      item.submitted ? "YES" : "NO",
      item.fileCount || 0,
      item.qualityScore || 1,
      item.qualityTier || "Non-Compliant",
      item.auditorNotes || "",
      fileSummary,
      new Date().toLocaleString()
    ]);
  }
}
`;
