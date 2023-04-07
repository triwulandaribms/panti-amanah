import dotenv from "dotenv";
dotenv.config();
import express from "express";

import {
  getAllChild,
  getChildNik,
  addDataAnak,
  editDataAnak,
  hapusDataAnak,
  getAllDonasi,
  addDataDonasi,
  hapusDataDonasi,
  getAllAdopsi,
  addDataAdopsi,
  hapusDataAdopsi,
  allGabung,
  logoutToken,
  jumlahTabelAnak,
  jmlhTabelAdopsi,
  sumTabelDonasi,
} from "./route/data.js";

import { client } from "./db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

const app = express();

// MIDDLEWARE
// untuk mengelola cookienya
app.use(cookieParser());

// BAGIAN UNTUK MEMBACA BODY BERFORMAT JSON
app.use(express.json());

app.use((req, res, next) => {
  if (req.path.startsWith("/api/login") || req.path.startsWith("/assets")) {
    next();
  } else {
    let authorized = false;
    if (req.cookies.token) {
      try {
        jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        authorized = true;
      } catch (err) {
        res.setHeader("Cache-Control", "no-store"); // khusus untuk vercel
        res.clearCookie("token");
      }
    }
    if (authorized) {
      if (req.path.startsWith("/login")) {
        res.redirect("/");
      } else {
        next();
      }
    } else {
      if (req.path.startsWith("/login")) {
        next();
      } else {
        if (req.path.startsWith("/api")) {
          res.status(401);
          res.send("Anda harus login terlebih dahulu.");
        } else {
          res.redirect("/login");
        }
      }
    }
  }
});

// ROUTE OTORISASI
app.post("/api/login", async (req, res) => {
  const results = await client.query(
    `SELECT * FROM admin WHERE username = '${req.body.username}'`
  );

  if (results.rows.length > 0) {
    if (await bcrypt.compare(req.body.password, results.rows[0].password)) {
      const token = jwt.sign(results.rows[0], process.env.SECRET_KEY);
      res.cookie("token", token);
      res.send("Login berhasil.");
    } else {
      res.status(401);
      res.send("Kata sandi salah.");
    }
  } else {
    res.status(401);
    res.send("admin tidak ditemukan.");
  }
});

// Untuk mengakses file statis
// app.use(express.static("public"));

// Untuk mengakses file statis (khusus Vercel)
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/admin", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `INSERT INTO admin (username,password) VALUES ('${req.body.username}','${hash}')`
  );
  res.send("Berhasil tambah admin");
});

app.delete("/api/hapus/:username", async (req, res) => {
  await client.query(
    `DELETE FROM admin WHERE username = '${req.params.username}'`
  );
  res.send("berhasil menghapus");
});

// ROUTE DATA ANAK
app.get("/api/anak", getAllChild);
app.get("/api/anak/:nik_anak", getChildNik);
app.post("/api/tambah", addDataAnak);
app.put("/api/edit/:nik_anak", editDataAnak);
app.delete("/api/child/:nik_anak", hapusDataAnak);

// ROUTE DATA PENGADOPSI
app.get("/api/adopsi", getAllAdopsi);
app.post("/api/nambah", addDataAdopsi);
app.delete("/api/adopsi/:nik_adopsi", hapusDataAdopsi);

// ROUTE DATA PENDONASI
app.get("/api/donasi", getAllDonasi);
app.post("/api/add", addDataDonasi);
app.delete("/api/donasi/:nik_infak", hapusDataDonasi);

// ROUTE TAMPIL DATA ANAK DAN PENGADOPSI
app.get("/api/anakAdopsi", allGabung);

//LIHAT JUMLAH DATA ANAK, PENGADOPSI,DONASI
app.get("/api/jumlahAnak", jumlahTabelAnak);
app.get("/api/jmlhAdopsi", jmlhTabelAdopsi);
app.get("/api/sumDonasi", sumTabelDonasi);

// ROUTE UNTUK LOGOUT
app.get("/api/keluar", logoutToken);

app.listen(3000, () => {
  console.log("Server berhasil berjalan.");
});
