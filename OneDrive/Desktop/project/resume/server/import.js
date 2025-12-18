const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");

mongoose.connect("mongodb://localhost:27017/internshipsDB");

const internshipSchema = new mongoose.Schema({
  company_name: String,
  qualification: String,
  skills_required: String,
  state: String,
  district: String,
  intern_title: String
});

const Internship = mongoose.model("Internship", internshipSchema);

async function importCSV() {
  const results = [];
  fs.createReadStream("skills_relevant_fixed.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      await Internship.insertMany(results);
      console.log("CSV data imported into MongoDB!");
      mongoose.connection.close();
    });
}

importCSV();
