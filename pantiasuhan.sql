CREATE database pantiasuhan;

CREATE TABLE anak (
    nik_anak varchar PRIMARY KEY,
    nama varchar,
    umur varchar,
    jenis_kelamin
);


CREATE TABLE pengadopsi (
    nik_adopsi TEXT PRIMARY KEY,
    nama varchar,
    alamat varchar,
    gaji varchar,
    nik_anak TEXT
);

alter table pengadopsi add constraint fk_nik_anak foreign key (nik_anak) references anak(nik_anak); 

CREATE TABLE penginfak(
    nik_infak TEXT PRIMARY KEY,
    nama varchar,
    alamat varchar,
    jumlah_uang varchar
);

 INSERT INTO anak (nik_anak,nama,umur,jenis_kelamin) VALUES
 ('020421110300','panca wiguna','8','L'),
 ('020421110301','Gayuh pangestu','7','L'),
 ('020421110302','bianca arini','6','p'),
 ('020421110304','novi prihatiningsih','10','p'),
 ('020421110306','bimas arsyad pangestu','7','L'),
 ('020421110307','wisnu bangun sudrajat','10','L'),
 ('0204211103010','panca wiguna','10','L'),
 ('0204211103011','sri wahyuni','9','p'),
 ('0204211103012','tika pribadiyanti','8','p'), 
 ('020421110308','restu ardana','5','p'),
 ('020421110303','arin naura','8','p'),
 ('0204211103013','putri anyelir','10','p'),
 ('0204211103015','eva yulita','10','p'),
 ('020421110305','dias winda','6','p'),
 ('020421110309','jihan wardani','8','L'),
 ('0204211103014','resty maryamah','7','p');

 INSERT INTO penginfak (nik_infak,nama,alamat,jumlah_uang) VALUES 
 (' 0101','Gayuh Pangestu',' banyumas','500000'),
 (' 0202','arin naura istigfarani','banyumas','1000000'),
 (' 0303','Supardi','Kedungbanteng','1500000'),
 (' 0404','wahyuni','purwokerto','20000000'),
 (' 0505','sukarningsih','sudagaran','2000000'),
 (' 0606','widiastuti','purwokerto','600000'),
 (' 0707','pamungkas','banjarnegara','700000'),
 (' 0808','yoga','pasinggangan','1000000'),
 (' 0909','wiwit','banyumas','400000'),
 (' 1010','supardi','somakaton','2000000');

 
 SELECT * FROM anak ORDER BY nik_anak ASC;

 SELECT * FROM anak WHERE nik_anak;

 UPDATE anak SET nik_anak, nama,umur, jenis_kelamin WHERE nik_anak;

 DELETE FROM anak WHERE nik_anak;
 
 SELECT * FROM pengadopsi ORDER BY nik_adopsi ASC;

 SELECT * FROM pengadopsi ORDER BY nik_adopsi ASC;

 DELETE FROM pengadopsi WHERE nik_adopsi;

 SELECT * FROM penginfak ORDER BY nik_infak ASC;

 DELETE FROM penginfak WHERE nik_infak;

 SELECT COUNT(*) FROM anak;

 SELECT COUNT(*) FROM pengadopsi;

 SELECT COUNT(*) FROM penginfak;

 SELECT anak.nama, anak.umur, anak.jenis_kelamin, pengadopsi.alamat FROM anak INNER JOIN pengadopsi ON anak.nik_anak = pengadopsi.nik_anak;























































