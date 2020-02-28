const { Router } = require("express");
const Event = require("./model");

const router = new Router();
// read all events
router.get("/events", (req, res, next) => {
  Event.findAll()
    .then(events => {
      if (events) {
        return res.json(events);
      } else {
        res.status(404).send("No events exist");
      }
    })
    .catch(next);
});
//pagination
// router.get("/events", (req, res, next) => {
//   const limit = Math.min(req.query.limit || 25, 500);
//   const offset = req.query.offset || 0;
//   Event.findAndCountAll({ limit, offset })
//     .then(result => {
//       if (result) {
//         return res.send({ events: result.rows, total: result.count });
//       } else {
//         res.status(404).send("No events exist");
//       }
//     })
//     .catch(next);
// });
// create a new event
router.post("/events", (req, res, next) => {
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
});
// read event by ID
router.get("/events/:eventId", (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => {
      if (event) {
        return res.status(200).json(event);
      } else {
        res.status(404).send("event does not exist");
      }
    })
    .catch(next);
});
// update event by ID
router.put("/events/:eventId", (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => {
      if (event) {
        return event
          .update(req.body)
          .then(event => res.status(200).json(event));
      } else {
        return res.status(404).send("does not exist");
      }
    })
    .catch(next);
});
// delete event by ID
router.delete("/events/:eventId", (req, res, next) => {
  Event.destroy({ where: { id: req.params.eventId } })
    .then(rowsDeleted => {
      console.log(rowsDeleted);
      if (rowsDeleted === 1) {
        res.status(200).send("This event has been deleted");
      } else res.status(404).send("No such event");
    })
    .catch(next);
});
module.exports = router;
