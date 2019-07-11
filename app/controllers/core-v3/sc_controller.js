'use strict'

const { Scratchcard, Project } = require('../../models')
const { transformResponseToCoreStyle,extractFilters } = require("../../helpers/helpers")
const knex = require('../../../config/database')

/**
 * get scratch cards using filters 
 */
module.exports = async function getCards(req, res, next){
  const appliedFilters = extractFilters(req.query,['status','batch_number','campaign_code']);

  let qb = Scratchcard.filteredQueryBuilder(appliedFilters);
  const scs = await Scratchcard.paginateQuery(qb,req.query)
              .catch(next);

  return res.json(transformResponseToCoreStyle(scs));
}

module.exports = async function checkCard(req, res, next){
  const appliedFilters = extractFilters(req.query,['serial_no','card_no']);

  let qb = Scratchcard.filteredQueryBuilder(appliedFilters);
  const scs = await qb.first().catch(next);

  return res.json({
    error: false,
    data: scs
  });
}

/**
 * GET scratch cards inventory
 * Note that it will only return the cards which are not SOLD by retailers, Not used and Active
 */
module.exports = async function getInventory(req, res, next){

  let qb = Scratchcard.queryBuilder(['campaign_code','serial_no','added_on','inventory_info']);

  let cond = `status = 'Active' AND (inventory_info->>'inventory_status'='WITH_RETAILER' OR inventory_info->>'inventory_status'='IN_INVENTORY') `;
  if(req.query.retailernumber){
    cond = cond + ` AND inventory_info->>'retailernumber'='${req.query.retailernumber}'`;
  }
  qb.whereRaw(cond);
  
  const scs = await Scratchcard.paginateQuery(qb,req.query)
              .catch(next);

  return res.json(transformResponseToCoreStyle(scs));
}

/**
 * GET scratch cards statuses which has been assigned to a specific retailer
 */

module.exports = async function getRetailerSales(req, res, next){

  let filter = '';
  if(req.query.inventory_status){
    filter = `AND inventory_info->>'inventory_status'='${req.query.inventory_status}'`;
  }

  let qb = Scratchcard.rawQueryBuilder();
  qb.select(knex.raw('scratch_card.campaign_code, serial_no, campaigns.charge_amount charge_amount, inventory_info'))
      .leftJoin('campaigns', 'campaigns.campaign_code', 'scratch_card.campaign_code')
      .whereRaw(`inventory_info->>'retailernumber'='${req.params.retailernumber}' ${filter}`)
      .orderBy('scratch_card.id','asc');
    
  const scs = await Scratchcard.paginateQuery(qb,req.query,true).catch(next);

  return res.json(transformResponseToCoreStyle(scs,true));
}


/**
 * GET inventory status of a card by serial number
 */

module.exports = async function getInventoryStatusBySerial(req, res, next){
  let qb = Scratchcard.rawQueryBuilder();
  qb.select('scratch_card.campaign_code','scratch_card.serial_no','scratch_card.status','campaigns.charge_amount','scratch_card.added_on','scratch_card.inventory_info')
  .where('serial_no', req.params.serial_no)
  .leftJoin('campaigns', 'scratch_card.campaign_code', 'campaigns.campaign_code');

  const scs = await qb.first()
              .catch(next);

  return res.json(transformResponseToCoreStyle(scs));
}

const postProjects = (req, res, next) => {
  const userId = req.params.id
  const props = req.body.project

  Project.create({ ...props, user_id: userId })
    .then(project => res.json({
      ok: true,
      message: 'Project created',
      project,
      userId
    }))
    .catch(next)
}

const getProjects = (req, res, next) => {
  const userId = req.params.id

  Project.findAll()
    .then(projects => res.json({
      ok: true,
      message: 'Projects found',
      projects,
      userId
    }))
    .catch(next)
}

const getProject = (req, res, next) => {
  const projectId = req.params.id

  Project.findById(projectId)
    .then(project => res.json({
      ok: true,
      message: 'Project found',
      project
    }))
    .catch(next)
}

const putProject = (req, res, next) => {
  const projectId = req.params.id
  const props = req.body.project

  Project.update(projectId, props)
    .then(project => res.json({
      ok: true,
      message: 'Project updated',
      project
    }))
    .catch(next)
}

const deleteProject = (req, res, next) => {
  const projectId = req.params.id

  Project.destroy(projectId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'Project deleted',
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postProjects,
  getProjects,
  getProject,
  putProject,
  deleteProject
}
