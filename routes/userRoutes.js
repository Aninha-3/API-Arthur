const { Router } = require("express")
const userController = require("../controllers/userController");
 
const router = Router();
 
router.post("/usuario", (request, response) => {
    userController.create(request, response)
});
router.get("/usuario", (request, response) => {
    userController.getAll(request, response)
});
router.put("/:id", (request, response) => {
    userController.update(request, response)
});
router.delete("/:id", (request, response) => {
    userController.delete(request, response)
});
module.exports = router;