const xlsx = require('xlsx');
const fs = require('fs');

// Step 1: Read the Excel file
const excelFilePath = 'نتيجة الثانوية 24.xlsx'; // Replace with the path to your Excel file
const workbook = xlsx.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
const worksheet = workbook.Sheets[sheetName];

// Step 2: Convert the worksheet to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

console.log(jsonData[0]); 
// Step 3: Write the JSON data to a file
const jsonFilePath = 'output.json'; // Replace with the desired path for your JSON file
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

console.log(`Excel data has been converted to JSON and saved to ${jsonFilePath}`);
