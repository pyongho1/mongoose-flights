import { Meal } from "../models/performer.js";

function newMeal(req, res) {
  Meal.find({})
    .then((meals) => {
      res.render("performers/new", {
        title: "Add Meal",
        meals,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

export { newMeal as new };
