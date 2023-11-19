"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventos_1 = require("../controllers/eventos");
const router = (0, express_1.Router)();
router.get('/all', eventos_1.getEventos);
router.get('/:titulo', eventos_1.getEvento);
router.post('/', eventos_1.postEvento);
router.put("/:titulo", eventos_1.putEvento);
exports.default = router;
//# sourceMappingURL=Eventos.js.map