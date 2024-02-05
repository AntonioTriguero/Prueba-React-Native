const { db } = require("../firebase");
const { Router } = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const router = Router();

//Ruta que devuelve todos los libros
router.get("/books", async (req, res) => {
    const querySnapshot = await db.collection("libros").get();

    const books = querySnapshot.docs.map((doc) => {
        const data = {
            id: doc.id,
            ...doc.data(),
        };
        return data;
    });

    res.send(books);
});

//Ruta que devuelve los detalles de un libro segun la id
router.get("/books/:id", async (req, res) => {
    const doc = await db.collection("libros").doc(req.params.id).get();

    //Sacamos los datos del libro del doc
    const data = doc.data();

    res.send(data);
});

//Añadir un nuevo libro
router.post("/books", fileUpload(), async (req, res) => {
    // const directory = path.join(__dirname, "../photos");

    // const sharpPhoto = sharp(req.files.cover.data);
    // sharpPhoto.resize(500);
    const fileName = req.body.title + ".jpg";
    const filePath = "src/photos/" + fileName;
    // const filePath = path.join(directory, fileName);
    // await sharpPhoto.toFile(filePath);

    fs.writeFile(filePath, req.files.cover.data, function (err) {
        if (err) throw err;
        console.log("File saved.");
    });

    // const photo = "http://192.168.1.38:3000/photos/" + fileName;

    const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        pages: req.body.pages,
        cover: filePath,
    };

    await db.collection("libros").add(newBook);

    res.send("Se ha creado un nuevo libro");
});

//Actualizar los datos de un libro
router.put("/books/:id", async (req, res) => {
    //Sacamos el doc del libro que queremos actualizar
    const doc = await db.collection("libros").doc(req.params.id).get();

    //Sacamos los datos
    const data = doc.data();

    //Actualizamos el libro de forma que si no cambias el dato, se quede como estaba
    const updatedBook = {
        title: req.body.title || data.title,
        author: req.body.author || data.author,
        genre: req.body.genre || data.genre,
        pages: req.body.pages || data.pages,
    };

    //Actualizamos el libro
    await db.collection("libros").doc(req.params.id).update(updatedBook);

    res.send("Se ha actualizado el libro");
});

//Borrar un libro
router.delete("/books/:id", async (req, res) => {
    await db.collection("libros").doc(req.params.id).delete();
    res.send("Contacto eliminado");
});

module.exports = router;
