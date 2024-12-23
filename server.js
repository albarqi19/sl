import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.VITE_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.VITE_GOOGLE_SPREADSHEET_ID;

app.get('/api/top-students', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Students Data!A:G',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.json([]);
    }

    const students = rows.slice(1).map(row => ({
      name: row[1] || '',
      points: parseInt(row[6] || '0', 10),
      level: row[2] || '',
    })).filter(student => !isNaN(student.points));

    const sortedStudents = students
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);

    res.json(sortedStudents);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'حدث خطأ في جلب البيانات' });
  }
});

// نقطة نهاية جديدة للحصول على سجل نقاط الطالب
app.get('/api/student-records/:studentId', async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.VITE_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.VITE_GOOGLE_SPREADSHEET_ID;
    const { studentId } = req.params;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Record Data',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.json({ records: [] });
    }

    // تحويل الصفوف إلى كائنات مع أسماء الحقول
    const headers = [
      'id', 'studentId', 'studentName', 'pages', 'reason', 
      'teacher', 'dateTime', 'date', 'studentNumber', 
      'teacherName', 'totalPoints', 'level'
    ];

    const records = rows.slice(1).map(row => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = row[index] || '';
      });
      return record;
    });

    // فلترة السجلات حسب معرف الطالب
    const studentRecords = records.filter(record => 
      record.studentId === studentId || 
      record.studentNumber === studentId
    );

    res.json({ records: studentRecords });
  } catch (error) {
    console.error('Error fetching student records:', error);
    res.status(500).json({ error: 'Failed to fetch student records' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
