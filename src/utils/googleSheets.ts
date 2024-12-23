import { google } from 'googleapis';
import credentials from '../config/google-credentials.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SPREADSHEET_ID = '1JVHUXf23kQ0ZVu8Hc1g-sqrMCUwHufw4Bj4KKGyd_j4';

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getTopStudents() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Students Data!A:G', // نطاق البيانات من العمود A إلى G
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // تحويل البيانات إلى مصفوفة من الكائنات
    const students = rows.slice(1).map(row => ({
      name: row[1] || '', // اسم الطالب (العمود B)
      points: parseInt(row[6] || '0', 10), // جميع النقاط (العمود G)
      level: row[2] || '', // المستوى (العمود C)
    })).filter(student => !isNaN(student.points)); // استبعاد الطلاب الذين ليس لديهم نقاط صحيحة

    // ترتيب الطلاب حسب النقاط تنازلياً
    const sortedStudents = students
      .sort((a, b) => b.points - a.points)
      .slice(0, 10); // أخذ أعلى 10 طلاب

    return sortedStudents;
  } catch (error) {
    console.error('Error fetching top students:', error);
    throw error;
  }
}
