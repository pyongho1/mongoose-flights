import { Flight } from "../models/movie.js";

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
  Flight.create(req.body)
    .then((flight) => {
      res.redirect("/flights");
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

export { newFlight as new, create, index, deleteFlight as delete, show, edit };
