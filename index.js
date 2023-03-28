import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { client } from "./db.js";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

const app = express();

app.use(cookieParser());

app.use(express.static("public"));

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
        res.setHeader("Cache-Control", "no-store"); // khusus Vercel
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

// import path from "path";
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json());

app.post("/api/login", async (req, res) => {
  const results = await client.query(
    `SELECT * FROM admin WHERE password = '${req.body.password}'`
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

app.get("/api/saya", (req, res) => {
  const me = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  res.json(me);
});

// app.get("/api/logout", (_req, res) => {
//   res.setHeader("Cache-Control", "no-store"); // khusus Vercel
//   res.clearCookie("token");
//   res.send("Logout berhasil.");
// });

app.get("/api/anak", async (_req, res) => {
  const results = await client.query("SELECT * FROM anak");
  res.json(results.rows);
});

app.get("/api/anak/:nik_anak", async (req, res) => {
  const results = await client.query(
    `SELECT * FROM anak WHERE nik_anak = ${req.params.nik_anak}`
  );
  res.json(results.rows[0]);
});

const salt = await bcrypt.genSalt();
const hash = await bcrypt.hash("michalec031", salt);
console.log(hash);

app.post("/api/anak", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `INSERT INTO anak (nik_anak,nama,umur,jenis_kelamin) VALUES ('${req.body.nik_anak}', '${req.body.nama}',${req.body.umur}', '${req.body.jenis_kelamin}','${hash}')`
  );
  res.send("anak berhasil ditambahkan.");
});

app.put("/api/anak/:nik_anak", async (req, res) => {
  await client.query(
    `UPDATE anak SET nik_anak = '${req.body.nik_anak}', nama = '${req.body.nama}', umur = '${req.body.umur}', jenis_kelamin = '${req.body.jenis_kelamin}' WHERE nik_anak = ${req.params.nik_anak}`
  );
  res.send("anak berhasil diedit.");
});

app.delete("/api/anak/:nik_anak", async (req, res) => {
  await client.query(
    `DELETE FROM anak WHERE nik_anak = ${req.params.nik_anak}`
  );
  res.send("data anak berhasil dihapus.");
});

app.listen(3000, () => {
  console.log("Server berhasil berjalan.");
});
