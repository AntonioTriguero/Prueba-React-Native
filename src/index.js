const app = require("./app");


//Añadimos el puerto y llamamos
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server iniciado en el puerto ${PORT}...`);
});
