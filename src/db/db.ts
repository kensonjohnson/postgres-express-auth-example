import pg from "pg";
import { DB_CONFIG } from "../constants.js";

const { Pool } = pg;

export const pool = new Pool(DB_CONFIG);
