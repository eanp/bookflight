import express,{ Request, Response, NextFunction } from "express";
import {getFacilities,postFacilities,getAirports,postAirports,postAirportsSeeder,getAirline,postAirline,postAirlineSeeder,getFlight,postFlight,postFlightSeeder,getFlightDetail,getFlightAll} from "../controller/Airlines"

const router = express.Router()



router.get('/facilities',getFacilities)
router.post('/facilities',postFacilities)
router.get('/airports',getAirports)
router.post('/airports',postAirports)
router.post('/airports/seeder',postAirportsSeeder)
router.get('/airline',getAirline)
router.post('/airline',postAirline)
router.post('/airline/seeder',postAirlineSeeder)
router.get('/flight',getFlight)
router.get('/flight-all',getFlightAll)
router.get('/flight/:code',getFlightDetail)
router.post('/flight',postFlight)
router.post('/flight/seeder',postFlightSeeder)


export default router