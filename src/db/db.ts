import pg from "pg";
import { dbConfig } from "../constants.js";

const { Pool } = pg;

export const pool = new Pool(dbConfig);
