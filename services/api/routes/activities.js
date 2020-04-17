const express = require('express');
const router = express.Router();

const activities = require('../controllers/activities.js');

router.get('', activities.getActivities);
router.get('/:id', activities.getActivity);
router.put('/:id', activities.putActivity);

module.exports = router;
