import  { Router } from "express";
import { Contenedor } from './Contenedor.js';


const router = Router();
const file = new Contenedor ('./productos.txt');

router.get("/productos", async (req, res) => {
  try {
      await file.readFile().then(data => {
        res.render("pages/datos.ejs",
        {data: data})
      });
    } catch (error) {
        console.log(error);
    }
  }  
  ); 



router.get("/productos/form",  (req, res) => {
      res.render("pages/form.ejs",null)

    })

router.post("/productos/form", async (req, res) => {
  const producto = req.body
  try {
      await file.readFile().then(data => {
      producto.id = data.length + 1;
      data.push(producto);
      file.writeFile(JSON.stringify(data)); 
      res.redirect("/productos")
      });
      } catch (error) {
        console.log(error);
      }
});



export default router;
