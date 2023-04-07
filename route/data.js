import { client } from "../db.js";

// DATA ANAK
export async function getAllChild(_req, res) {
  const results = await client.query(
    "SELECT * FROM anak ORDER BY nik_anak ASC"
  );
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
export async function getAllAdopsi(_req, res) {
  const results = await client.query(
    "SELECT * FROM pengadopsi ORDER BY nik_adopsi ASC"
  );
  res.json(results.rows);
}

export async function addDataAdopsi(req, res) {
  await client.query(
    `INSERT INTO pengadopsi (nik_adopsi,nama,alamat,gaji,nik_anak) VALUES('${req.body.nik_adopsi}','${req.body.nama}','${req.body.alamat}','${req.body.gaji}','${req.body.nik_anak}')`
  );
  res.send("Pengadopsi telah ditambahkan");
}

export async function hapusDataAdopsi(req, res) {
  await client.query(
    `DELETE FROM pengadopsi WHERE nik_adopsi = '${req.params.nik_adopsi}'`
  );
  res.send("berhasil menghapus data pengadopsi");
}

// DATA PENDONASI
export async function getAllDonasi(_req, res) {
  const results = await client.query(
    "SELECT * FROM penginfak ORDER BY nik_infak ASC"
  );
  res.json(results.rows);
}

export async function addDataDonasi(req, res) {
  await client.query(
    `INSERT INTO penginfak (nik_infak,nama,alamat,jumlah_uang) VALUES ('${req.body.nik_infak}','${req.body.nama}','${req.body.alamat}','${req.body.jumlah_uang}')`
  );
  res.send("pendonasi berhasil ditambahkan.");
}

export async function hapusDataDonasi(req, res) {
  await client.query(
    `DELETE FROM penginfak WHERE nik_infak = '${req.params.nik_infak}'`
  );
  res.send("data pendonasi berhasil dihapus.");
}

export async function allGabung(_req, res) {
  const results = await client.query(
    "SELECT anak.nama, anak.umur, anak.jenis_kelamin, pengadopsi.alamat FROM anak INNER JOIN pengadopsi ON anak.nik_anak = pengadopsi.nik_anak"
  );
  res.json(results.rows);
}

export async function jumlahTabelAnak(_req, res) {
  const results = await client.query("SELECT COUNT(*) FROM anak");
  res.json(results.rows[0]);
}

export async function jmlhTabelAdopsi(_req, res) {
  const results = await client.query("SELECT COUNT(*) FROM pengadopsi");
  res.json(results.rows[0]);
}

export async function sumTabelDonasi(_req, res) {
  const results = await client.query("SELECT COUNT(*) FROM penginfak");
  res.json(results.rows[0]);
}

export async function logoutToken(_req, res) {
  res.setHeader("Cache-Control", "no-store"); // khusus Vercel
  res.clearCookie("token");
  res.send("token berhasil dihapus");
}
