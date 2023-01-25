import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const controllerEquip = new TeamController(teamService);

const equipPath = Router();

equipPath.get('/', controllerEquip.createTeams);
equipPath.get('/:id', controllerEquip.idOfTeam);

export default equipPath;
