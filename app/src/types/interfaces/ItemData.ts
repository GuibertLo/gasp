import type { Evaluations } from "../enums/Evaluations";

/**
 * @typedef ItemData
 * @prop { string } objective - The Item's parent Objective primary key
 * @prop { number } id - The Item's identifier
 * @prop { string } name - The Item's name
 * @prop { string } topic - The Item's topic, security, privacy or both
 * @prop { number } probability - The Item's probability, value between 1 and 5
 * @prop { number } severity - The Item's severity, value between 1 and 5
 * @prop { number } risk - The Item's risk, value between 1 and 25
 * @prop { string } requirement - The Item's requirement, can be either must, should, or could
 * @prop { string } PK - The Item's unique primary key
 * @prop { string } [remarks] - The Item's remarks when defining it, if any
 * @prop { undefined | Evaluations } evaluation - The Item's evaluation status
 */
interface ItemData {
  objective: string;
  id: number;
  name: string;
  topic: string;
  probability: number;
  severity: number;
  risk: number;
  requirement: string;
  PK: string;
  remarks?: string;
  evaluation?: undefined | Evaluations;
}

export type { ItemData };
