const { db } = require("../firebase");
const { Router } = require("express");

const router = Router();

//Ruta principal de la aplicación (en a prueba pone que sea get/books)
router.get("/", async (req, res) => {
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

router.get("/books/:id", async (req, res) => {
    const doc = await db.collection("libros").doc(req.params.id).get();

    //Sacamos los datos del libro del doc
    const data = doc.data();

    res.send(data)
});

//Añadir un nuevo libro
router.post("/books", async (req, res) => {
    console.log(req.body);

    const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        pages: req.body.pages,
    };

    await db.collection("libros").add(newBook);

    res.send("New Contact Created");
});

module.exports = router;
