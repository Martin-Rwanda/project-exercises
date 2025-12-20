import express from 'express';
import db from './models';
import { users, projects, projectAssignments } from './seeders';

const app = express();

// const createUsers = () => {
//     users.map(user => {
//         db.User.create(user)
//     })
// }
// createUsers();
// const createProjects = () => {
//     projects.map(project => {
//         db.Project.create(project)
//     })
// }
// createProjects();
// const createProjectsAss = () => {
//     projectAssignments.map(projectAss => {
//         db.ProjectAssignment.create(projectAss)
//     })
// }
// createProjectsAss();

// db.ProjectAssignment.create({
//     ProjectId:1,
//     UserId:'0aaf0d74-cc80-4198-aa7c-ad61f7bf03de'
// })


app.get('/', (req, res) => {
    db.User.findAll({
        include: {
            model: db.Project,
            // as: 'leader',
            },
    }).then((result: object) => res.json(result))
      .catch((err: object) => console.log(err))
})

const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(port, ()=> {
        console.log(`App listening on port ${port}` )
    })
});