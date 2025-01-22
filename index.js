import cors from "cors";
import express from "express";
import { employees } from "./employees.js";
const app = express();
const port = 8080;

function main() {
    app.use(cors());

    app.get("/employees", (req, res) => {
        const { page = 1, limit = 5 } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        res.status(200).json({
            data: employees.slice(startIndex, endIndex),
            length: employees.length,
        });
    });

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });

    app.get("/employee/:id", (req, res) => {
        const { id } = req.params;

        const employee = employees.find(
            (employee) => employee.id === Number(id)
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json(employee);
    });
}

main();
