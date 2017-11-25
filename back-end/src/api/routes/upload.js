const express = require('express');

const { hemera } = require('./config');
// const parseTenant = require('./middlewares/parseTenant');

const router = express.Router();
hemera.tag = 'upload-instance';

// router.use(parseTenant);

// GET /upload/getLink
router.get('/uploadUrl', (req, res) => {
  hemera.act({
    topic: 'upload',
    cmd: 'genLink',
    meta$: { tenantId: req.subdomains[0] || 'Others' },
    fileType: req.query.fileType,
  }).then(res.response)
    .catch(err => res.response(442, err));
});

module.exports = router;
