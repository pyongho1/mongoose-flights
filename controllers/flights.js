import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js";

function index(req, res) {
  Flight.find({})
    .then((flights) => {
      res.render("flights/index", {
        flights,
        title: "All Flights",
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  });
}

function create(req, res) {
  if (req.body.departs === "") delete req.body.departs;
  Flight.create(req.body)
    .then((flight) => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
    .then((flight) => {
      res.redirect("/flights");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

function show(req, res) {
  Flight.findById(req.params.id)
    .populate("meal")
    .then((flight) => {
      res.render("flights/show", {
        title: "Flight Detail",
        flight,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

function edit(req, res) {
  Flight.findById(req.params.id)
    .then((flight) => {
      res.render("flights/edit", {
        title: "Edit Movie",
        flight,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

function update(req, res) {
  if (req.body.departs === "") {
    let date = new Date();
    let oneYearFromNow = date.getFullYear() + 1;
    date.setFullYear(oneYearFromNow);
    req.body.departs = date;
  }
  // for (let key in req.body) {
  //   if (req.body[key] === "") delete req.body[key];
  // }
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((flight) => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
    .then((flight) => {
      flight.tickets.push(req.body);
      flight
        .save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
};
