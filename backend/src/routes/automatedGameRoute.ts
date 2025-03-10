import {Router} from "express";
import {startAutomatedGame} from "../controllers/automatedGameController";

const router: Router = Router()

router.get("/", startAutomatedGame)

export default router
