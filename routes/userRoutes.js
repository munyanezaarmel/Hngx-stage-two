const express = require("express");
const ModelUser = require("../Models/Model");
const router = express.Router();

router.post("/", (req, res) => {
  const blog = new ModelUser({
    name: req.body.name,
  });

  blog
    .save()
    .then((result) => {
      const response = {
        data: result,
        message: "User created successfully",
        status: "success",
      };
      res.status(201).json(response);
    })
    .catch((error) => {
      console.error(error);
      const response = {
        message: "Internal server error",
        status: "error",
      };
      res.status(500).json(response);
    });
});
router.get("/", (req, res) => {
  ModelUser.find()
    .then((result) => {
      const response = {
        users: result,
        message: "All users",
        status: "success",
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      const response = {
        message: "users not found",
        status: "error",
      };
      res.status(404).json(response);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  ModelUser.findById(id)
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json({ message: "User not found", status: "fail" });
      }
      const response = {
        user: result,
        message: "user retrieved successfully",
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      const response = {
        message: "user not found",
        status: "fail",
      };
      res.status(404).json(response);
    });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  ModelUser.findById(id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: "fail" });
      }

      ModelUser.findByIdAndDelete(id)
        .then(() => {
          const response = {
            message: "User deleted successfully",
          };
          res.status(200).json(response);
        })
        .catch((err) => {
          console.log(err);
          const response = {
            message: "Something went wrong, please try again",
            status: "error",
          };
          res.status(500).json(response);
        });
    })
    .catch((err) => {
      console.log(err);
      const response = {
        message: "Something went wrong, please try again",
        status: "error",
      };
      res.status(500).json(response);
    });
});
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  ModelUser.findById(id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: "fail" });
      }

      ModelUser.findByIdAndUpdate(id, updates, { new: true })
        .then((result) => {
          const response = {
            data: result,
            message: "User updated successfully",
          };
          res.status(200).json(response);
        })
        .catch((err) => {
          console.log(err);
          const response = {
            message: "Something went wrong, please try again",
            status: "error",
          };
          res.status(500).json(response);
        });
    })
    .catch((err) => {
      console.log(err);
      const response = {
        message: "Something went wrong, please try again",
        status: "error",
      };
      res.status(500).json(response);
    });
});
module.exports = router;
