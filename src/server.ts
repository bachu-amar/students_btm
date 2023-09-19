import app from "@/app";
import { logger } from "@utils/logger";
import { NODE_ENV, PORT } from "@config";
import validator from "@utils/validateEnv";
validator();
// ROUTES
// import connectDatabase from "./databases";
import HomeRoute from "@routes/index.route";
import users from "@/routes/users.route"
import login ,{} from '@/routes/login.route'; 
import student from '@/routes/student.routes'
import connectDatabase from "./databases";
// const routes = [
//   {
//     path: "/",
//     func: HomeRoute,
//   },
// ];

// routes.forEach(({ path, func }) => {
//   app.use(path, func);
// });

app.use('/',HomeRoute)
// http://localhost:8080/users

// app.use('/users',users)
// http://localhost:8080/auth/register
app.use('/auth',login)

app.use('/v1',student)

connectDatabase();
app.listen(PORT, () => {
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port http://localhost:${PORT}`);
});
