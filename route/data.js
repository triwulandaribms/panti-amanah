import { client } from "../db.js";

// DATA ANAK
export async function getAllChild(_req, res) {
  const results = await client.query("SELECT * FROM anak");
  res.json(results.rows);
}

export async function getChildNik(req, res) {
  const results = await client.query(
    `SELECT * FROM anak WHERE nik_anak = '${req.params.nik_anak}'`
  );
  res.send(results.rows[0]);
}

export async function addDataAnak(req, res) {
  await client.query(
    `INSERT INTO anak (nik_anak,nama,umur,jenis_kelamin) VALUES ('${req.body.nik_anak}','${req.body.nama}','${req.body.umur}','${req.body.jenis_kelamin}')`
  );
  res.send("anak berhasil ditambahkan.");
}

export async function editDataAnak(req, res) {
  await client.query(
    `UPDATE anak SET nik_anak = '${req.body.nik_anak}', nama = '${req.body.nama}', umur = '${req.body.umur}', jenis_kelamin = '${req.body.jenis_kelamin}' WHERE nik_anak = '${req.params.nik_anak}'`
  );
  res.send("anak berhasil diedit.");
}

export async function hapusDataAnak(req, res) {
  await client.query(
    `DELETE FROM anak WHERE nik_anak = '${req.params.nik_anak}'`
  );
  res.send("data anak berhasil dihapus.");
}

// DATA PENGADOPSI

// DATA PENGINFAK
