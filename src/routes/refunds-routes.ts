import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authentication";
import { Router } from "express";

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.create
);
refundsRoutes.get(
  "/",
  verifyUserAuthorization(["manager"]),
  refundsController.index
);

refundsRoutes.get(
  "/:id",
  verifyUserAuthorization(["manager", "employee"]),
  refundsController.show
);

export { refundsRoutes };
